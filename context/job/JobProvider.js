import { createContext, useState } from "react"

export const JobContext = createContext()

const INITIAL_STATE = {
  showModal: false,
  id: undefined,
}

export const JobProvider = ({ children }) => {
  const [job, setJob] = useState(INITIAL_STATE)

  const openModal = (jobId) => {
    setJob({
      showModal: true,
      id: jobId,
    })
  }

  const closeModal = () => {
    console.log("close modal")
    setJob(INITIAL_STATE)
  }

  return (
    <JobContext.Provider
      value={{
        job,

        // methods
        openModal,
        closeModal,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}
