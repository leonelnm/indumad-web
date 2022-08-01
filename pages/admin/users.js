import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { adminUserTabMenu } from "components/ui"

export default function UsersPage(params) {
  // TODO Validate user auth and token

  return (
    <MainLayout>
      <h1>UsersPage</h1>
      <TabsBar list={adminUserTabMenu} />
    </MainLayout>
  )
}
