import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

// custom
import { indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { useAuthContext } from "hooks/context"
import { useAxios } from "hooks/useAxios"
import { cookieNames, getCookie } from "utils/cookies"
import { messages } from "utils/messages"
import { isGestor } from "utils/roles"
import { AddEditUser } from "./AddEditUser"

export const ProfileInfo = () => {
  const { user } = useAuthContext()

  const { error, isLoading, data } = useAxios({
    url: `${indumadRoutes.user}/${user?.id}`,
    token: getCookie(cookieNames.token),
  })

  console.log(error, isLoading, data)

  return (
    <Container disableGutters>
      {isLoading && <DotFlash />}
      {error && (
        <Box>
          <Alert severity="warning">{messages.user.profile_search_error}</Alert>
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
  )
}
