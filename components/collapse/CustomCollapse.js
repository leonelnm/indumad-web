import { Box, Button, Collapse, Grid } from "@mui/material"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useState } from "react"

export const CustomCollapse = ({ children, title = "Sin Título" }) => {
  const [open, setOpen] = useState(false)
  const collapseHandler = () => {
    console.log("collapseHandler")
    setOpen(!open)
  }
  return (
    <Box component="section">
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
      >
        <Button
          variant="text"
          disableElevation
          onClick={collapseHandler}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
          fullWidth
        >
          {title}
        </Button>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Box>
  )
}
