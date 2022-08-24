import { Box, Divider } from "@mui/material"
import { Toaster } from "react-hot-toast"

// custom
import { MainLayout } from "components/layouts"
import { Container } from "@mui/system"
import { CreateJobForm } from "components/job/CreateJobForm"
import { CustomTitle } from "components/ui"

export default function createJobPage() {
  return (
    <MainLayout title="Crear Trabajo">
      <Toaster position="top-center" reverseOrder={false} />
      <CustomTitle title={"Crear Nuevo Trabajo"} />
      <Divider />
      <Box component="section" sx={{ pt: "1rem", pb: "1rem" }}>
        <Container disableGutters maxWidth="md">
          <CreateJobForm />
        </Container>
      </Box>
    </MainLayout>
  )
}
