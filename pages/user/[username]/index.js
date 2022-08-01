import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { userProfileTabMenu } from "components/ui"
import { useRouter } from "next/router"

export default function ProfilePage() {
  const { username } = useRouter().query

  return (
    <MainLayout>
      <h1>ProfilePage</h1>
      <p>Bienvenido : {username}</p>

      <TabsBar list={userProfileTabMenu} />
    </MainLayout>
  )
}
