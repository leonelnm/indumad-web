import { Box, Button } from "@mui/material"
import CleaningServicesIcon from "@mui/icons-material/CleaningServices"
import { useAuthContext } from "hooks/context"

export const CleanCookies = () => {
  const { logout } = useAuthContext()

  const handleRemoveData = () => {
    logout()
  }

  return (
    <Box pt={10} sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        color="warning"
        variant="outlined"
        onClick={handleRemoveData}
        endIcon={<CleaningServicesIcon />}
      >
        Limpiar Datos
      </Button>
    </Box>
  )
}
