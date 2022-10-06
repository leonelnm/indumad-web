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

export const CardCollapse = ({
  children,
  title = "Sin Título",
  variant = "outlined",
  openOnStart = true,
  component = "section",
}) => {
  const [open, setOpen] = useState(openOnStart)
  const collapseHandler = () => {
    setOpen(!open)
  }

  return (
    <Card component={component} variant={variant}>
      <CardHeader
        action={
          <IconButton aria-label="collapse" onClick={collapseHandler}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ fontSize: "1.1em" }}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
      />

      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent sx={{ pl: 0, pr: 0, pt: 2, pb: 2 }}>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  )
}
