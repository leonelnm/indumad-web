import { Alert, AlertTitle, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { indumadClient, indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { useAxios } from "hooks/useAxios"
import { useEffect, useState } from "react"
import { messages } from "utils/messages"
import { JobSearcher } from "./JobSearcher"
import { ListJobItem } from "./ListJobItem"

export const ListJobByEmployee = ({ handleOpenScheduleModal }) => {
  const [status, setStatus] = useState("*")
  const [jobsFiltered, setJobsFiltered] = useState([])
  const [showReset, setShowReset] = useState(false)
  const [query, setQuery] = useState("")
  const [filterLoading, setFilterLoading] = useState(false)

  const {
    error,
    isLoading,
    data: jobs,
    setData: setJobs,
    setError,
  } = useAxios({
    url: indumadRoutes.job.path,
  })

  useEffect(() => {
    if (jobs) {
      setJobsFiltered(jobs)
    }
  }, [jobs])

  const searchJobByState = async () => {
    const { error, data: jobs } = await indumadClient({
      url: `${indumadRoutes.job.path}${
        status !== "*" ? `?state=${status}` : ""
      }`,
    })

    if (error) {
      setError(error)
    } else {
      setJobs(jobs)
    }
  }

  useEffect(() => {
    searchJobByState()
  }, [status])

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
    setShowReset(false)
    setQuery("")
    setJobsFiltered(jobs)
  }

  const filter = (query) => {
    setFilterLoading(true)
    setQuery(query)

    if (!query) {
      setShowReset(false)
      setQuery("")
      setJobsFiltered(jobs)
    } else {
      setShowReset(true)
    }

    if (query.length < 1) {
      setFilterLoading(false)
      return
    }

    setJobsFiltered(
      jobs.filter((job) => {
        return (
          `${job.id}` === query ||
          job.contact.address.toLowerCase().includes(query) ||
          job.contact.name.toLowerCase().includes(query)
        )
      })
    )
    setFilterLoading(false)
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
      <JobSearcher
        onChange={filter}
        value={query}
        reset={resetSearcher}
        showReset={showReset}
        status={status}
        setStatus={setStatus}
      />

      {query && query.length >= 1 && (
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

      {filterLoading && <DotFlash />}

      {Array.isArray(jobsFiltered) && jobsFiltered.length === 0 && (
        <Alert severity="info" variant="outlined">
          {`${messages.job.empty} ${status}`}
        </Alert>
      )}

      {Array.isArray(jobsFiltered) &&
        jobsFiltered.map((job) => (
          <ListJobItem
            key={job.id}
            job={job}
            handleOpenScheduleModal={handleOpenScheduleModal}
          />
        ))}
    </Container>
  )
}
