import { Alert, Box, List } from "@mui/material"
import { indumadRoutes } from "api"
import { useFetchSwr } from "hooks/useFetchSwr"
import { useCallback, useEffect, useState } from "react"
import { EasyItemAddEdit } from "./EasyItemAddEdit"
import { EasyItem } from "./EasyItem"
import { DotFlash } from "components/loaders/DotFlash"
import { messages } from "utils/messages"

// Está hecha para funcionar con Guild y References, por defecto es Guild
// De momento Guild y References son iguales a nivel de Administración
export const EasyList = ({ isGuild = true }) => {
  const [list, setList] = useState([])

  const path = isGuild ? indumadRoutes.guild : indumadRoutes.reference
  const msg = isGuild ? messages.guild : messages.reference

  const { error, isLoading, data } = useFetchSwr({
    path,
  })

  useEffect(() => {
    if (!error && !isLoading) {
      setList(data)
    }
  }, [isLoading])

  const validateUniqueName = useCallback(
    (name) => {
      return !list.find((item) => item.name === name)
    },
    [list]
  )

  const addItem = useCallback(
    (data) => {
      if (data) {
        setList([...list, data])
      }
    },
    [list]
  )

  const updateItem = useCallback(
    (old = "", updatedData = {}) => {
      if (updatedData && old) {
        const tmp = [...list]
        const index = tmp.findIndex((item) => item.name === old)
        tmp[index] = updatedData
        setList([...tmp])
      }
    },
    [list]
  )

  const deleteItem = useCallback(
    (name = "") => {
      if (name) {
        const tmp = [...list]
        const index = tmp.findIndex((item) => item.name === name)
        if (index > -1) {
          tmp.splice(index, 1)
        }
        setList([...tmp])
      }
    },
    [list]
  )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <EasyItemAddEdit
        handlerSubmit={addItem}
        validate={validateUniqueName}
        isGuild={isGuild}
      />

      {error && (
        <Box mt={2}>
          <Alert severity="error">{msg.error_list}</Alert>
        </Box>
      )}

      <List>
        {isLoading && <DotFlash />}
        {list &&
          list
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <EasyItem
                key={item.name}
                item={item}
                handlerSubmit={updateItem}
                validate={validateUniqueName}
                handlerDelete={deleteItem}
                isGuild={isGuild}
              />
            ))}
      </List>
    </Box>
  )
}
