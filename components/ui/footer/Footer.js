import { Divider, Stack } from "@mui/material"
import { Copyright } from "components/Copyright"

export const Footer = () => {
  return (
    <Stack p={2} component="footer" spacing={2}>
      <Divider />
      <Copyright sx={{ mb: 5 }} />
    </Stack>
  )
}
