import { IconButton, Menu, MenuItem } from "@mui/material"
import { useAuthContext } from "hooks/context"
import { useState } from "react"
import { AvatarLetter } from "./AvatarLetter"
import { NavMenuItem } from "./NavMenuItem"

export const NavMenu = ({ list = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { logout } = useAuthContext()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <IconButton onClick={handleMenu} sx={{ pr: 0, mr: 0 }}>
        <AvatarLetter />
      </IconButton>
      <Menu
        sx={{ mt: "2rem" }}
        id='menu-appbar-profile"'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <NavMenuItem list={list} handleClose={handleClose} />
        <MenuItem component="button" onClick={handleLogout}>
          Cerrar Sesion
        </MenuItem>
      </Menu>
    </>
  )
}
