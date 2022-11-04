import { Box, IconButton, Typography } from "@mui/material"
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import ViewerEditor from "components/editor/ViewerEditor"
import { useAuthContext } from "hooks/context"
import { useState } from "react"
import { getDateToShow } from "utils/date"
import { Stack } from "@mui/system"
import toast from "react-hot-toast"
import { indumadClient, indumadRoutes } from "api"
import { messages } from "utils/messages"

export const ListNoteItem = ({ note = {} }) => {
  const { isGestor } = useAuthContext()

  const [markAsRead, setMarkAsRead] = useState(
    isGestor ? note.readByGestor : note.readByEmployee
  )

  const { user } = useAuthContext()
  const owner = user.id === note.ownerId

  const handlerMarkAsRead = async (noteId) => {
    if (markAsRead) {
      return
    }

    setMarkAsRead(true)

    const { error } = await indumadClient({
      method: "put",
      url: `${indumadRoutes.notes.markAsRead}/${noteId}`,
    })

    if (error) {
      toast.error(messages.notes.read.error, { duration: 6000 })
      setMarkAsRead(false)
    } else {
      toast.success(messages.notes.read.success)
    }
  }

  return (
    <Box className={`followUpNote ${owner ? "right" : "left"}`}>
      <div className="editor-viewer">
        <ViewerEditor text={note.text} />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={0.7}
          mr={1}
        >
          <Typography
            ml={1}
            variant="caption"
            sx={{ color: "#0000007a", fontSize: ".725em" }}
          >
            {getDateToShow(note.createdAt)}
          </Typography>
          {!owner && (
            <IconButton
              aria-label="mark-as-read"
              onClick={() => handlerMarkAsRead(note.id)}
              color={markAsRead ? "success" : "secondary"}
              size="small"
              sx={{ padding: 0, margin: 0 }}
            >
              {markAsRead ? (
                <DoneAllIcon fontSize="small" />
              ) : (
                <MarkEmailUnreadIcon />
              )}
            </IconButton>
          )}
        </Stack>
      </div>
    </Box>
  )
}
