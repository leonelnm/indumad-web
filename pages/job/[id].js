import { Alert, AlertTitle, Container, Divider } from "@mui/material"
import { indumadClient, indumadRoutes } from "api"
import { ViewerJob } from "components/job/ViewerJob"
import { MainLayout } from "components/layouts"
import { DotFlash } from "components/loaders/DotFlash"
import { CustomTitle } from "components/ui"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast, { Toaster, useToaster } from "react-hot-toast"
import { messages } from "utils/messages"

export default function JobDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [job, setJob] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  // Remove success toast neccesary when comes from admin
  const { toasts } = useToaster()
  useEffect(() => {
    if (toasts.length > 0) {
      toast.dismiss()
    }
  }, [])

  useEffect(() => {
    if (id) {
      indumadClient({
        url: `${indumadRoutes.job}/${id}`,
      })
        .then(({ data }) => {
          setJob(data)
        })
        .catch(setError)
        .finally(() => setIsLoading(false))
    }
  }, [id])

  return (
    <MainLayout title="Detalle Trabajo">
      <CustomTitle title={"Detalle de Trabajo"} />
      <Divider />
      {error && (
        <Alert severity="warning">
          <AlertTitle>Error</AlertTitle>
          {messages.job.search}
        </Alert>
      )}

      {isLoading && <DotFlash />}

      {job && (
        <Container disableGutters maxWidth="md">
          <Toaster position="top-center" reverseOrder={false} />
          <ViewerJob job={job} />
        </Container>
      )}
    </MainLayout>
  )
}
