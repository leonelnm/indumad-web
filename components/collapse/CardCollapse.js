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
    <Card component={component} variant={variant} className="card-collapse">
      <CardHeader
        action={
          <IconButton
            aria-label="collapse"
            onClick={collapseHandler}
            sx={{ color: "#fff" }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ fontSize: "1.1em" }}
        className="card-collapse-header"
      />

      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  )
}
