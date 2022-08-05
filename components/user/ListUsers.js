import { Alert, Box, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Cookies from "js-cookie"

import { indumadRoutes } from "api"
import { useAxios } from "hooks/useAxios"
import { DotFlash } from "components/loaders/DotFlash"

export const ListUsers = () => {
  const token = Cookies.get("token")
  const { error, isLoading, data } = useAxios({
    url: indumadRoutes.user,
    token,
  })

  console.log(data)

  return (
    <Container>
      {isLoading && <DotFlash />}
      {error && (
        <Box>
          <Alert severity="warning">
            En estos momentos no es posible encontrar usuarios, espere unos
            minutos y vuelva a intentar
          </Alert>
        </Box>
      )}

      {!isLoading &&
        data.map((user) => (
          <Typography
            key={user.id}
          >{`${user.username}·${user.name}·${user.lastname}`}</Typography>
        ))}
    </Container>
  )
}
