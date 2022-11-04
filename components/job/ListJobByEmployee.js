import { Alert, AlertTitle, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { useAxios } from "hooks/useAxios"
import { useEffect, useState } from "react"
import { messages } from "utils/messages"
import { JobSearcher } from "./JobSearcher"
import { ListJobItem } from "./ListJobItem"

export const ListJobByEmployee = () => {
  const [jobsFiltered, setJobsFiltered] = useState([])
  const [loading, setLoading] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [query, setQuery] = useState("")

  const {
    error,
    isLoading,
    data: jobs,
  } = useAxios({
    url: indumadRoutes.job,
  })

  useEffect(() => {
    if (jobs) {
      setLoading(true)
      setJobsFiltered(jobs)
      setLoading(false)
    }
  }, [jobs])

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

  const resetSearcher = () => {
    setLoading(true)
    setShowReset(false)
    setQuery("")
    setJobsFiltered(jobs)
    setLoading(false)
  }

  const filter = (query) => {
    setLoading(true)
    setQuery(query)

    if (!query) {
      setShowReset(false)
      setQuery("")
      setJobsFiltered(jobs)
    } else {
      setShowReset(true)
    }

    if (query.length < 2) {
      setLoading(false)
      return
    }

    setJobsFiltered(
      jobs.filter((job) => {
        return (
          job.contact.address.toLowerCase().includes(query) ||
          job.contact.name.toLowerCase().includes(query)
        )
      })
    )
    setLoading(false)
  }

  return (
    <Container
      component="section"
      aria-label="list-jobs"
      disableGutters
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* <Container maxWidth="sm"> */}
      <Container disableGutters maxWidth="xs">
        <JobSearcher
          onChange={filter}
          value={query}
          reset={resetSearcher}
          showReset={showReset}
        />
      </Container>
      {query && query.length >= 2 && (
        <Box>
          <Typography variant="body2">{`Busqueda por ${query}: (${jobsFiltered.length})`}</Typography>
        </Box>
      )}
      {query && Array.isArray(jobsFiltered) && jobsFiltered.length === 0 && (
        <Alert variant="outlined" severity="info">
          <Typography>
            No se ha encontrado trabajos, intente con otro valor
          </Typography>
        </Alert>
      )}

      {(loading || isLoading) && <DotFlash />}

      {Array.isArray(jobsFiltered) &&
        jobsFiltered.map((job) => <ListJobItem key={job.id} job={job} />)}
      {/* </Container> */}
    </Container>
  )
}
