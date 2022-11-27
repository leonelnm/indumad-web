import { MainLayout } from "components/layouts/MainLayout"
import { Toaster } from "react-hot-toast"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import { CustomTitle } from "components/ui"

import { BillingViewer } from "components/billing/BillingViewer"
import { Container, Divider } from "@mui/material"

export default function FacturacionPage() {
  return (
    <MainLayout title="Facturación">
      <Toaster position="top-rigth" reverseOrder={false} />
      <CustomTitle title={"Facturación"} icon={<AccountBalanceIcon />} />
      <Divider />

      <Container disableGutters maxWidth="md" sx={{ pt: 2 }}>
        <BillingViewer />
      </Container>
    </MainLayout>
  )
}
