import { useAxios } from "hooks/useAxios"
import { indumadClient, indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { Alert, IconButton, Stack } from "@mui/material"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import ReceiptIcon from "@mui/icons-material/Receipt"
import NotInterestedIcon from "@mui/icons-material/NotInterested"
import { messages } from "utils/messages"
import { getListMonths } from "utils/date"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"
import { BillingFilter } from "./BillingFilter"
import { DownloadPdfIconButton } from "components/pdf/billing/DownloadPdfIconButton"
import { InvoicePdf } from "components/pdf/billing/InvoicePdf"
import { formatCurrency } from "utils/utils"
import { useAuthContext } from "hooks/context"

const getInvoiceByYearMonth = ({ year, month, list = [] }) => {
  return list.find((invoice) => {
    const date = new Date(invoice.invoiceDate)
    return date.getFullYear() === year && date.getMonth() + 1 === month
  })
}

const months = getListMonths()

export const BillingViewer = () => {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const { data, isLoading, error, setData, setError } = useAxios({
    url: indumadRoutes.billing.path,
    params: { year },
  })

  const searchByYearHandler = async () => {
    const { error, data: invoicesFilter } = await indumadClient({
      url: `${indumadRoutes.billing.path}?year=${year}`,
    })

    if (!error) {
      setData(invoicesFilter)
    } else {
      setError(error)
    }
  }

  useEffect(() => {
    searchByYearHandler()
  }, [year])

  if (isLoading) {
    return <DotFlash />
  }

  if (error) {
    return <Alert severity="error">{messages.billing.search.error}</Alert>
  }

  return (
    <Stack spacing={2}>
      <BillingFilter
        year={year}
        setYear={setYear}
        onSubmit={searchByYearHandler}
      />
      <BasicTable invoices={data} months={months} year={year} />
    </Stack>
  )
}

function BasicTable({ invoices = [], months = [], year }) {
  return (
    <TableContainer>
      <Table aria-label="simple table" sx={{ width: "100%" }}>
        <TableHead>
          <TableRow sx={{ th: { backgroundColor: "#ddd" } }}>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="center">Servicios</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="center">Remesa</TableCell>
            <TableCell align="center">Factura</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {months.map(({ id, name }) => (
            <InvoiceRow
              key={`${year}${name}`}
              year={year}
              monthName={name}
              invoice={getInvoiceByYearMonth({
                year,
                month: id,
                list: invoices,
              })}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function InvoiceRow({ year, monthName, invoice = undefined }) {
  return (
    <TableRow
      key={`${year}${monthName}`}
      sx={{
        td: { p: 0, pt: 1, pb: 1 },
        "td:first-of-type": { pl: 2 },
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="left">{`${monthName}, ${year}`}</TableCell>
      <TableCell align="center">{invoice ? invoice.amountJobs : "-"}</TableCell>
      <TableCell align="right">
        {invoice ? formatCurrency.format(invoice.total) : "-"}
      </TableCell>
      <TableCell align="center">
        {invoice ? (
          <DownloadInvoice
            invoice={invoice}
            icon={ReceiptIcon}
            date={`${monthName} ${year}`}
          />
        ) : (
          <DisabledButton />
        )}
      </TableCell>
      <TableCell align="center">
        {invoice ? (
          <DownloadInvoice
            invoice={invoice}
            isRemesa={false}
            icon={BorderColorIcon}
            date={`${monthName} ${year}`}
          />
        ) : (
          <DisabledButton />
        )}
      </TableCell>
    </TableRow>
  )
}

function DownloadInvoice({ invoice, isRemesa = true, icon, date }) {
  const filename = isRemesa ? "remesa" : "factura"
  const { isGestor } = useAuthContext()
  return (
    <DownloadPdfIconButton
      IconComponent={icon}
      filename={`${filename}-${invoice.invoiceDate}`}
    >
      <InvoicePdf
        invoice={invoice}
        isRemesa={isRemesa}
        date={date}
        isGestor={isGestor}
      />
    </DownloadPdfIconButton>
  )
}

function DisabledButton() {
  return (
    <IconButton disabled>
      <NotInterestedIcon />
    </IconButton>
  )
}
