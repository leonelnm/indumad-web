import GroupWorkIcon from "@mui/icons-material/GroupWork"
import { Box, Container, Divider } from "@mui/material"
import { Toaster } from "react-hot-toast"

import { MainLayout } from "components/layouts"
import { CustomTitle } from "components/ui"
import { EasyList } from "components/easyList/EasyList"

export default function guildsPage() {
  return (
    <MainLayout title="Gestión Gremios">
      <Toaster position="top-center" reverseOrder={false} />
      <CustomTitle title={"Gremios"} icon={<GroupWorkIcon />} />
      <Divider />

      <Box component="section" sx={{ pt: "1rem", pb: "1rem" }}>
        <Container disableGutters maxWidth="sm">
          <EasyList />
        </Container>
      </Box>
    </MainLayout>
  )
}
