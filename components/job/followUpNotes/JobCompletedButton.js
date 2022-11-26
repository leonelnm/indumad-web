import { Button, Divider, Stack } from "@mui/material"
import { messages } from "utils/messages"

export const JobCompletedButton = ({ handlerClick }) => {
  return (
    <>
      <Stack alignItems={"flex-start"} p={1}>
        <Button color="success" onClick={handlerClick}>
          {messages.ui.job.completed}
        </Button>
      </Stack>
      <Divider />
    </>
  )
}
