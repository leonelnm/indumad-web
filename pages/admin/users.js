import PeopleIcon from "@mui/icons-material/People"
import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { adminUserTabMenu, CustomTitle } from "components/ui"

export default function UsersPage(params) {
  // TODO Validate user auth and token

  return (
    <MainLayout title="Gestión Usuarios">
      <CustomTitle title={"Usuarios"} icon={<PeopleIcon />} />

      <TabsBar list={adminUserTabMenu} />
    </MainLayout>
  )
}
