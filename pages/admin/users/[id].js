import { Container } from "@mui/system"
import { useRouter } from "next/router"
import { Toaster } from "react-hot-toast"
import { Alert, Box, Divider, Stack } from "@mui/material"

import { useAxios } from "hooks/useAxios"
import { indumadRoutes } from "api"
import { MainLayout } from "components/layouts"
import { DotFlash } from "components/loaders/DotFlash"
import { AddEditUser } from "components/user/AddEditUser"
import { messages } from "utils/messages"
import { isGestor } from "utils/roles"
import { useAuthContext } from "hooks/context"
import { CardCollapse } from "components/collapse/CardCollapse"
import { ChangePassword } from "components/user/ChangePassword"
import { CustomTitle } from "components/ui"

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
      <CustomTitle title={`${data?.name} ${data?.lastname}`} />
      <Divider />

      <Box component="section" sx={{ pt: "1rem", pb: "5rem" }}>
        <Container disableGutters maxWidth="md">
          <Stack spacing={2}>
            <CardCollapse title="Información Personal">
              <Box p={2}>
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
                    edit={true}
                    user={data}
                    isAdmin={isGestor({ role: user.role })}
                  />
                )}
              </Box>
            </CardCollapse>
            <CardCollapse title={messages.ui.profile.changePassword}>
              <Container disableGutters maxWidth="xs">
                <ChangePassword userId={id} />
              </Container>
            </CardCollapse>
          </Stack>
        </Container>
      </Box>
    </MainLayout>
  )
}
