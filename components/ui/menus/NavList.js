import { List } from "@mui/material"
import { NavLinkList } from "./NavLinkList"

export const NavList = ({ list = [] }) => {
  return (
    <List>
      <NavLinkList list={list} />
    </List>
  )
}
