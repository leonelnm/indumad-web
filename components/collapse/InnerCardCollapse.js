import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material"
import { useState } from "react"

export const InnerCardCollapse = ({
  children,
  title = "Sin Título",
  variant = "normal",
  openOnStart = false,
  component = "article",
  border = true,
}) => {
  const [open, setOpen] = useState(openOnStart)
  const collapseHandler = () => {
    setOpen(!open)
  }

  return (
    <Card
      component={component}
      variant={variant}
      aria-label={`innercard-${title}`}
    >
      <CardHeader
        action={
          <IconButton aria-label="collapse-button" onClick={collapseHandler}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ fontSize: "1em" }}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          p: 1,
          borderBottom:
            border && (open ? "none" : "1px solid rgba(0, 0, 0, 0.12)"),
        }}
      />

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          borderBottom:
            border && (open ? "1px solid rgba(0, 0, 0, 0.12)" : "none"),
        }}
      >
        <CardContent sx={{ p: 1 }}>{children}</CardContent>
      </Collapse>
    </Card>
  )
}
