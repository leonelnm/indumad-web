import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { Toaster } from "react-hot-toast"
import { Alert, Box, Divider, Typography } from "@mui/material"

import { useAxios } from "hooks/useAxios"
import { indumadRoutes } from "api"
import { MainLayout } from "components/layouts"
import { DotFlash } from "components/loaders/DotFlash"
import { AddEditUser } from "components/user/AddEditUser"
import { messages } from "utils/messages"
import { isGestor } from "utils/roles"
import { useAuthContext } from "hooks/context"

export default function UserDetailPage() {
  const { user } = useAuthContext()
  const router = useRouter()
  const { id } = router.query

  const { isLoading, error, data } = useAxios({
    url: `${indumadRoutes.user}/${id}?guild=true`, // incluye guilds
  })

  return (
    <MainLayout title={`Usuario | ${data?.username}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h5">Información Personal</Typography>
      <Divider />

      <Box component="section" sx={{ pt: "1rem", pb: "1rem" }}>
        <Container disableGutters>
          {isLoading && <DotFlash />}
          {error && (
            <Box>
              <Alert severity="warning">
                {messages.user.profile_search_error}
              </Alert>
            </Box>
          )}
          {!isLoading && !error && (
            <AddEditUser
              edit="true"
              user={data}
              isAdmin={isGestor({ role: user.role })}
            />
          )}
        </Container>
      </Box>
    </MainLayout>
  )
}
