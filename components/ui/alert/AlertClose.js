import { Alert, AlertTitle, Collapse } from "@mui/material"
import { useState } from "react"

export const AlertClose = ({
  title = undefined,
  text = "",
  severity = "info",
}) => {
  const [open, setOpen] = useState(true)

  return (
    <Collapse in={open}>
      <Alert severity={severity} onClose={() => setOpen(false)}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {text}
      </Alert>
    </Collapse>
  )
}
