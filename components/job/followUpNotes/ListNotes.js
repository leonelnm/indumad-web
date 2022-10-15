import { Alert, AlertTitle, Box } from "@mui/material"
import { indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { useAxios } from "hooks/useAxios"
import { useEffect } from "react"
import { messages } from "utils/messages"
import { ListNoteItem } from "./ListNoteItem"

export const ListNotes = ({ jobId, notes, setNotes }) => {
  const { error, isLoading, data } = useAxios({
    url: `${indumadRoutes.notes.basePath}/${jobId}`,
  })

  useEffect(() => {
    setNotes(data || [])
  }, [data])

  if (error) {
    return (
      <Alert severity="warning">
        <AlertTitle>Error</AlertTitle>
        {messages.notes.error_list}
      </Alert>
    )
  }

  if (isLoading) {
    return <DotFlash />
  }

  return (
    <Box p={1} className="followUpNote-container">
      {notes.length === 0 && (
        <Alert severity="info">{messages.notes.empty}</Alert>
      )}

      {notes.map((note) => (
        <ListNoteItem key={note.id} note={note} />
      ))}
    </Box>
  )
}
