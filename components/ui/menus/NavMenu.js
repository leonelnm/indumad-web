import { Avatar, IconButton, Menu } from "@mui/material"
import { useState } from "react"
import { NavMenuItem } from "./NavMenuItem"

export const NavMenu = ({ list = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleMenu} sx={{ pr: 0, mr: 0 }}>
        <Avatar sx={{ width: 30, height: 30 }}>E</Avatar>
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
      </Menu>
    </>
  )
}
