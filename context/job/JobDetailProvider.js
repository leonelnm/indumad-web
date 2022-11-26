import { createContext } from "react"

export const JobDetailContext = createContext()

export const JobDetailProvider = ({ children, job }) => {
  return (
    <JobDetailContext.Provider
      value={{
        job,

        // methods
      }}
    >
      {children}
    </JobDetailContext.Provider>
  )
}
