import { Button, Divider, Stack } from "@mui/material"
import { messages } from "utils/messages"

export const AcceptBudget = ({ handleAction }) => {
  return (
    <Stack spacing={2} p={1}>
      <Stack flexDirection="row" justifyContent="center" gap={2}>
        <Button
          disableElevation
          color="neutral"
          onClick={() => handleAction(false)}
        >
          {messages.ui.budget.reject}
        </Button>
        <Button disableElevation onClick={() => handleAction(true)}>
          {messages.ui.budget.accept}
        </Button>
      </Stack>
      <Divider />
    </Stack>
  )
}
