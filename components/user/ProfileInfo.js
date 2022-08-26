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
import { ProfilePersonalData } from "./ProfilePersonalData"

export const ProfileInfo = () => {
  const { user } = useAuthContext()

  const { error, isLoading, data } = useAxios({
    url: `${indumadRoutes.user}/${user?.id}?guild=true`,
    token: getCookie(cookieNames.token),
  })

  return (
    <Container disableGutters>
      {isLoading && <DotFlash />}
      {error && (
        <Box>
          <Alert severity="warning">{messages.user.profile_search_error}</Alert>
        </Box>
      )}
      {!isLoading && !error && <ProfilePersonalData user={data} />}
    </Container>
  )
}
