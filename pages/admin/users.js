import PeopleIcon from "@mui/icons-material/People"
import { Toaster } from "react-hot-toast"

import { useAuthContext } from "hooks/context"
import { MainLayout } from "components/layouts/MainLayout"
import { TabsBar } from "components/TabsBar"
import { adminUserTabMenu, CustomTitle } from "components/ui"

import { isGestor } from "utils/roles"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function UsersPage() {
  const router = useRouter()
  const { user } = useAuthContext()
  useEffect(() => {
    if (!isGestor({ role: user?.role })) {
      router.push(`/`)
    }
  }, [user])

  return (
    <MainLayout title="Gestión Usuarios">
      <Toaster position="top-center" reverseOrder={false} />
      <CustomTitle title={"Usuarios"} icon={<PeopleIcon />} />

      <TabsBar list={adminUserTabMenu} />
    </MainLayout>
  )
}
