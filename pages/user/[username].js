import { MainLayout } from "components/layouts/MainLayout"
import { useRouter } from "next/router"

export default function ProfilePage(params) {
  const router = useRouter()

  const { username } = router.query

  return (
    <MainLayout>
      <h1>ProfilePage</h1>
      <p>Bienvenido:{username}</p>
    </MainLayout>
  )
}
