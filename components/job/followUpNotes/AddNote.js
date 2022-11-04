import { Button, Typography } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Box } from "@mui/system"
import Editor from "components/editor/Editor"
import { useState } from "react"
import {
  getStringLengthWithoutHtmlTags,
  validateIncidentInfo,
} from "utils/validationJob"

export const AddNote = ({ handlerSubmit = async () => {} }) => {
  const maxLength = 2500
  const [information, setInformation] = useState("")
  const [errorInfo, setErrorInfo] = useState({ error: false, msg: "" })
  const [counter, setCounter] = useState(0)
  const [disableSubmit, setDisableSubmit] = useState(true)

  const onChangeInformation = (data) => {
    setInformation(data)
    setCounter(getStringLengthWithoutHtmlTags(data))
    isInfoError(data)
  }

  const isInfoError = (data) => {
    const { error, msg } = validateIncidentInfo(
      data,
      maxLength,
      "Nota de Seguimiento"
    )
    setErrorInfo({ error, msg })
    setDisableSubmit(error)
  }

  const submitClick = async (e) => {
    setDisableSubmit(true)
    e.preventDefault()
    const { error } = await handlerSubmit(information)
    if (!error) {
      setInformation(">")
    }
    setDisableSubmit(false)
  }

  return (
    <Box component="form" onSubmit={submitClick} p={1} mb={3}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Editor
          setText={onChangeInformation}
          text={information}
          validation={errorInfo}
          placeholder="Añadir notas de seguimiento"
          heightConfig="followUpNote-editor"
        />
        {counter > maxLength - 100 && (
          <Typography
            pl={2}
            mr={2}
            variant="caption"
            color={counter > maxLength ? "error" : ""}
          >
            {counter}/{maxLength}
          </Typography>
        )}
        {errorInfo.error && (
          <Typography variant="caption" color="error" pl={2}>
            {errorInfo.msg}
          </Typography>
        )}
      </Box>
      <Box m={1} sx={{ textAlign: "right" }}>
        <Button type="submit" disabled={disableSubmit} endIcon={<SendIcon />}>
          Enviar Nota de Seguimiento
        </Button>
      </Box>
    </Box>
  )
}
