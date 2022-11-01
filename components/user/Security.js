import { Container, Typography } from "@mui/material"
import { useAuthContext } from "hooks/context"
import { messages } from "utils/messages"
import { ChangePassword } from "./ChangePassword"

export const Security = () => {
  const { user } = useAuthContext()

  return (
    <Container disableGutters maxWidth="xs">
      <Typography variant="h6">{messages.ui.profile.changePassword}</Typography>
      <ChangePassword userId={user.id} />
    </Container>
  )
}
