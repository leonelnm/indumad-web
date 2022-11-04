import { Typography } from "@mui/material"
import { Toaster } from "react-hot-toast"

import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { userProfileTabMenu } from "components/ui"

export default function ProfilePage() {
  return (
    <MainLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography mb={2} variant="h5">
        Configuración de Cuenta
      </Typography>

      <TabsBar list={userProfileTabMenu} />
    </MainLayout>
  )
}
