import { Container, Divider } from "@mui/material"
import { indumadRoutes } from "api"
import { ViewNotasSeguimiento } from "components/job/followUpNotes/ViewNotasSeguimiento"
import { MainLayout } from "components/layouts"
import { CustomTitle } from "components/ui"
import { useFetchSwr } from "hooks/useFetchSwr"
import { useRouter } from "next/router"
import { Toaster } from "react-hot-toast"

export default function FollowupNotesPage() {
  const router = useRouter()
  const { jobId } = router.query

  const { data: job, isLoading } = useFetchSwr({
    path: `${indumadRoutes.job.path}/${jobId}`,
  })

  return (
    <MainLayout title="Notas de Seguimiento">
      <CustomTitle title={"Notas de Seguimiento"} />
      <Divider />

      <Container disableGutters maxWidth="md">
        <Toaster position="top-center" reverseOrder={false} />
        <ViewNotasSeguimiento jobId={jobId} job={job} isLoading={isLoading} />
      </Container>
    </MainLayout>
  )
}
