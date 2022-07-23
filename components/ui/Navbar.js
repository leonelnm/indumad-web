import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { useContext } from "react"
import { UIContext } from "context"

export const Navbar = () => {
  const { openSideBar } = useContext(UIContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideBar}>
          <MenuOutlinedIcon />
        </IconButton>

        <Typography variant="h5">Indumad</Typography>
      </Toolbar>
    </AppBar>
  )
}
