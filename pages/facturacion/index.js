import { MainLayout } from "components/layouts/MainLayout"
import { useFetch } from "hooks/useFetch"

export default function FacturacionPage() {
  const { data: users, isLoading, isError } = useFetch({ path: "/user" })

  console.log({ isError })
  console.log({ isLoading })
  console.log({ users })

  return (
    <MainLayout>
      <h1>Facturacion</h1>
      <div>
        <p>Error</p>
      </div>
    </MainLayout>
  )
}
