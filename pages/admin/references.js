import LocalActivityIcon from "@mui/icons-material/LocalActivity"
import { Box, Container, Divider } from "@mui/material"
import { Toaster } from "react-hot-toast"

import { MainLayout } from "components/layouts"
import { CustomTitle } from "components/ui"
import { EasyList } from "components/easyList/EasyList"

export default function referencesPage() {
  return (
    <MainLayout title="Gestión Referencias">
      <Toaster position="top-center" reverseOrder={false} />
      <CustomTitle title={"Referencias"} icon={<LocalActivityIcon />} />
      <Divider />

      <Box component="section" sx={{ pt: "1rem", pb: "1rem" }}>
        <Container disableGutters maxWidth="sm">
          <EasyList isGuild={false} />
        </Container>
      </Box>
    </MainLayout>
  )
}
