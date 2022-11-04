import { Container } from "@mui/material"
import { useAuthContext } from "hooks/context"
import { isGestor } from "utils/roles"
import { AddEditUser } from "./AddEditUser"

export const CreateUser = () => {
  const { user } = useAuthContext()

  return (
    <Container disableGutters>
      <AddEditUser isAdmin={isGestor({ role: user.role })} />
    </Container>
  )
}
