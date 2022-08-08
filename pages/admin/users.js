import PeopleIcon from "@mui/icons-material/People"
import { Toaster } from "react-hot-toast"

import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { adminUserTabMenu, CustomTitle } from "components/ui"

export default function UsersPage(params) {
  // TODO Validate user auth and token

  return (
    <MainLayout title="Gestión Usuarios">
      <Toaster position="top-center" reverseOrder={false} />
      <CustomTitle title={"Usuarios"} icon={<PeopleIcon />} />

      <TabsBar list={adminUserTabMenu} />
    </MainLayout>
  )
}
