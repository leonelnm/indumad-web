import { Typography } from "@mui/material"
import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { adminUserTabMenu } from "components/ui"

export default function UsersPage(params) {
  // TODO Validate user auth and token

  return (
    <MainLayout title="Usuarios">
      <Typography variant="h5" sx={{ mb: 1 }}>
        Administrar Usuarios
      </Typography>
      <TabsBar list={adminUserTabMenu} />
    </MainLayout>
  )
}
