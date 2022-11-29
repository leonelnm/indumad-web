import { Box, Button, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import toast from "react-hot-toast"

import { EasyItemAddEdit } from "./EasyItemAddEdit"
import { indumadClient, indumadRoutes } from "api"
import { messages } from "utils/messages"

export const EasyItem = ({
  item = {},
  handlerSubmit = () => {},
  validate = () => {},
  isGuild = true,
  handlerDelete = () => {},
}) => {
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const path = isGuild ? indumadRoutes.guild : indumadRoutes.reference
  const msg = isGuild ? messages.guild.deleted : messages.reference.deleted

  const handleEdit = (status) => {
    setEdit(status)
  }

  const handleDelete = async (name) => {
    try {
      setLoading(true)
      const url = `${path}/${name}`
      const { error } = await indumadClient({
        method: "delete",
        url,
      })

      if (!error) {
        toast.success(msg.sucess)
        handlerDelete(name)
      } else {
        toast.error(`${msg.fail}.\n${error.translate}!`, {
          duration: 6000,
        })
      }
    } catch (error) {
      toast.error(`${msg.error}`, {
        duration: 6000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ListItem disableGutters>
      {edit ? (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Eddit */}
          <EasyItemAddEdit
            value={item.name}
            validate={validate}
            edit={true}
            handlerSubmit={handlerSubmit}
            handleEdit={handleEdit}
            isGuild={isGuild}
          />
        </Box>
      ) : (
        <>
          <ListItemText primary={item.name} sx={{ flexGrow: 1 }} />
          {/* Button Edit */}
          <Button
            color="info"
            variant="outlined"
            aria-label={`edit ${item.name}`}
            sx={{ flexGrow: 0 }}
            onClick={() => handleEdit(true)}
          >
            <EditIcon />
          </Button>
          {/* Button Delete */}
          <Button
            color="error"
            variant="outlined"
            aria-label={`delete ${item.name}`}
            sx={{ flexGrow: 0 }}
            onClick={() => handleDelete(item.name)}
            disabled={loading}
          >
            <DeleteIcon />
          </Button>
        </>
      )}
    </ListItem>
  )
}
