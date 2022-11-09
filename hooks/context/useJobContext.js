import { JobContext } from "context"
import { useContext } from "react"

export function useJobContext() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error("useJobContext must be used within a JobProvider")
  }
  return context
}
