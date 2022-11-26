import { createContext, useState } from "react"

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])

  const cleanJobs = () => setJobs([])

  const getJobs = () => {
    setJobs([])
  }

  const filterJobs = (filter) => {
    setJobs([])
  }

  return (
    <JobContext.Provider
      value={{
        jobs,

        // methods
        cleanJobs,
        getJobs,
        filterJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}
