import { UIContext } from "context"
import { useContext } from "react"

export function useUiContext() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error("useUiContext must be used within a UIProvider")
  }
  return context
}
