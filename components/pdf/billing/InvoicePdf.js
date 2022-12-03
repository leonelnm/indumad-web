import DocumentContainer from "../DocumentContainer"
import { InvoiceTable } from "./InvoiceTable"
import { InvoiceTitle } from "./InvoiceTitle"
import { InvoiceTotals } from "./InvoiceTotals"

export const InvoicePdf = ({
  invoice,
  isRemesa = true,
  date,
  isGestor = false,
}) => {
  return (
    <DocumentContainer orientation="landscape">
      <InvoiceTitle
        isRemesa={isRemesa}
        fullname={invoice.fullname}
        isGestor={isGestor}
      />
      <InvoiceTable invoice={invoice} date={date} isGestor={isGestor} />
      <InvoiceTotals invoice={invoice} />
    </DocumentContainer>
  )
}
