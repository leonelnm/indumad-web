import { Alert, AlertTitle, Box } from "@mui/material"
import { DotFlash } from "components/loaders/DotFlash"
import { messages } from "utils/messages"
import { ListNoteItem } from "./ListNoteItem"

export const ListNotes = ({ notes, error, isLoading }) => {
  // const { error, isLoading, data } = useAxios({
  //   url: `${indumadRoutes.notes.basePath}/${jobId}`,
  // })

  // useEffect(() => {
  //   setNotes(data || [])
  // }, [data])

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
      {(!notes || notes.length === 0) && (
        <Alert severity="info">{messages.notes.empty}</Alert>
      )}

      {notes && notes.map((note) => <ListNoteItem key={note.id} note={note} />)}
    </Box>
  )
}
