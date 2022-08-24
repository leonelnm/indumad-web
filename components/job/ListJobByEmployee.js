import { Alert, AlertTitle } from "@mui/material"
import { Box } from "@mui/system"
import { indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { useAxios } from "hooks/useAxios"
import Link from "next/link"
import { cookieNames, getCookie } from "utils/cookies"
import { messages } from "utils/messages"

export const ListJobByEmployee = () => {
  const {
    error,
    isLoading,
    data: jobs,
  } = useAxios({
    token: getCookie(cookieNames.token),
    url: indumadRoutes.job,
  })

  if (error) {
    return (
      <Alert severity="warning">
        <AlertTitle>Error</AlertTitle>
        {messages.job.error_list}
      </Alert>
    )
  }

  if (isLoading) {
    return <DotFlash />
  }

  return (
    <Box>
      {jobs.map((job) => (
        <div key={job.id}>
          <Link href={`/job/${job.id}`}>
            <a>
              Trabajo: {job.id}. Employee -
              {job.employee !== null && job.employee.name}-
            </a>
          </Link>
        </div>
      ))}
    </Box>
  )
}
