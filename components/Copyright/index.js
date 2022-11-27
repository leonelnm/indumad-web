import { Typography } from "@mui/material"
import { messages } from "utils/messages"

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      <Typography variant="body2" component={"strong"} sx={{ fontWeight: 900 }}>
        {messages.ui.appName}
      </Typography>{" "}
      {new Date().getFullYear()}
    </Typography>
  )
}
