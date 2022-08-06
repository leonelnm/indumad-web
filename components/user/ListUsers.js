import { Alert, Box, Typography } from "@mui/material"
import { Container } from "@mui/system"

import { indumadRoutes } from "api"
import { useAxios } from "hooks/useAxios"
import { DotFlash } from "components/loaders/DotFlash"
import { cookieNames, getCookie } from "utils/cookies"
import { messages } from "utils/messages"

export const ListUsers = () => {
  const { error, isLoading, data } = useAxios({
    url: indumadRoutes.user,
    token: getCookie(cookieNames.token),
  })

  return (
    <Container>
      {isLoading && <DotFlash />}
      {error && (
        <Box>
          <Alert severity="warning">{messages.user.ERROR_LIST}</Alert>
        </Box>
      )}

      {!isLoading &&
        data.map((user) => (
          <Typography
            key={user.id}
          >{`${user.username}·${user.name}·${user.lastname}·[${user.roles}]`}</Typography>
        ))}
    </Container>
  )
}
