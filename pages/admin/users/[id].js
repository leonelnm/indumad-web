import { Container } from "@mui/system"
import { useRouter } from "next/router"

import { useAxios } from "hooks/useAxios"

import { indumadRoutes } from "api"
import { MainLayout } from "components/layouts"
import { cookieNames, getCookie } from "utils/cookies"
import { DotFlash } from "components/loaders/DotFlash"
import { UserDetail } from "components/user/UserDetail"
import { Divider, Typography } from "@mui/material"

export default function UserDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const { isLoading, data } = useAxios({
    url: `${indumadRoutes.user}/${id}`,
    token: getCookie(cookieNames.token),
  })

  return (
    <MainLayout title={`Usuario | ${data?.username}`}>
      <Typography variant="h5">Información Personal</Typography>
      <Divider />

      {isLoading && <DotFlash />}

      {!isLoading && (
        <Container>
          <UserDetail user={data} />
        </Container>
      )}
    </MainLayout>
  )
}
