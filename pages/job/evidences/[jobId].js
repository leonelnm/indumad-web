import { Container, Divider } from "@mui/material"
import { ViewEvidences } from "components/job/evidences/ViewEvidences"
import { MainLayout } from "components/layouts"
import { CustomTitle } from "components/ui"
import { useRouter } from "next/router"
import { Toaster } from "react-hot-toast"

export default function FollowupNotesPage() {
  const router = useRouter()
  const { jobId } = router.query

  return (
    <MainLayout title="Evidencias">
      <CustomTitle title={"Evidencias"} />
      <Divider />

      <Container disableGutters maxWidth="md">
        <Toaster position="top-center" reverseOrder={false} />
        <ViewEvidences jobId={jobId} />
      </Container>
    </MainLayout>
  )
}
