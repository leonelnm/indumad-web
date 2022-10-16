import { Alert, AlertTitle, Box, Container, Divider } from "@mui/material"
import { indumadClient, indumadRoutes } from "api"
import { EditJobForm } from "components/job/EditJobForm"
import { MainLayout } from "components/layouts"
import { DotFlash } from "components/loaders/DotFlash"
import { CustomTitle } from "components/ui"
import { useAuthContext } from "hooks/context"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { messages } from "utils/messages"

export default function editJobPage() {
  const { isGestor } = useAuthContext()
  const router = useRouter()
  const { id } = router.query
  const [job, setJob] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isGestor !== undefined && !isGestor) {
      router.replace("/")
    }
  }, [isGestor])

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
    <MainLayout title="Editar Trabajo">
      <CustomTitle title={"Editar Trabajo"} />
      <Divider />
      {error && (
        <Alert severity="warning">
          <AlertTitle>Error</AlertTitle>
          {messages.job.search}
        </Alert>
      )}

      {isLoading && <DotFlash />}

      {job && isGestor && (
        <>
          <Toaster position="top-center" reverseOrder={false} />

          <Box component="section" sx={{ pt: "1rem", pb: "1rem" }}>
            <Container disableGutters maxWidth="md">
              <EditJobForm job={job} />
            </Container>
          </Box>
        </>
      )}
    </MainLayout>
  )
}
