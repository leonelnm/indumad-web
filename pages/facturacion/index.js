import { MainLayout } from "components/layouts/MainLayout"
import { Loader } from "components/loaders/Loader"
import { UserList } from "components/ui/users/userList"
import { useFetch } from "hooks/useFetch"

export default function FacturacionPage() {
  const { data: users, isLoading, isError } = useFetch({ path: "/user" })

  console.log({ isError })
  console.log({ isLoading })
  console.log({ users })

  return (
    <MainLayout>
      {isLoading && <Loader />}
      <div>
        <p>Error</p>
        <p>{isError}</p>
      </div>
      <UserList users={users} />
    </MainLayout>
  )
}
