import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Box } from "@mui/system"
import Editor from "components/editor/Editor"
import { useState } from "react"
import {
  getStringLengthWithoutHtmlTags,
  validateIncidentInfo,
} from "utils/validationJob"
import { messages } from "utils/messages"

export const AddNote = ({
  handlerSubmit = async () => {},
  isBudget = false,
}) => {
  const maxLength = 2500
  const [information, setInformation] = useState("")
  const [errorInfo, setErrorInfo] = useState({ error: false, msg: "" })
  const [counter, setCounter] = useState(0)
  const [disableSubmit, setDisableSubmit] = useState(true)
  const [budget, setBudget] = useState("0.00")
  const [errorBudget, setErrorBudget] = useState({ error: false, msg: "" })
  const [disableSubmitByBudget, setDisableSubmitByBudget] = useState(isBudget)

  const onChangeInformation = (data) => {
    setInformation(data)
    setCounter(getStringLengthWithoutHtmlTags(data))
    isInfoError(data)
  }

  const onChangeBudget = (event) => {
    const value = event.target.value
    setBudget(value)

    if (isNaN(value) || value === "" || value * 1 <= 0) {
      setErrorBudget({ error: true, msg: messages.ui.budget.notValid })
      setDisableSubmitByBudget(true)
    } else {
      setErrorBudget({ error: false, msg: "" })
      setDisableSubmitByBudget(false)
    }
  }

  const isInfoError = (data) => {
    const { error, msg } = validateIncidentInfo(
      data,
      maxLength,
      isBudget ? messages.ui.budget.add : messages.ui.deliveryNote.title
    )
    setErrorInfo({ error, msg })
    setDisableSubmit(error)
  }

  const submitClick = async (e) => {
    setDisableSubmit(true)
    e.preventDefault()
    const { error } = await handlerSubmit(
      isBudget ? { information, budget } : information
    )
    if (!error) {
      setInformation("-")

      if (isBudget) {
        setDisableSubmitByBudget(true)
        setBudget("0.00")
      }
    }
  }

  return (
    <Stack component="form" onSubmit={submitClick} p={1} mb={3} spacing={2}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {isBudget && (
          <Typography variant="caption">{messages.ui.budget.add}</Typography>
        )}
        <Editor
          setText={onChangeInformation}
          text={information}
          validation={errorInfo}
          placeholder={
            isBudget ? messages.ui.budget.add : messages.ui.deliveryNote.title
          }
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

      {isBudget && (
        <TextField
          label={messages.ui.budget.total}
          name="budgetTotal"
          type="text"
          value={budget}
          onChange={onChangeBudget}
          error={errorBudget.error}
          helperText={errorBudget.msg}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
            inputProps: {
              style: { textAlign: "right" },
            },
          }}
        />
      )}

      <Box sx={{ textAlign: "right" }}>
        <Button
          type="submit"
          disabled={disableSubmit || disableSubmitByBudget}
          endIcon={<SendIcon />}
        >
          {isBudget ? messages.ui.budget.send : messages.ui.commons.send}
        </Button>
      </Box>
    </Stack>
  )
}
