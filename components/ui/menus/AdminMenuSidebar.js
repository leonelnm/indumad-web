import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { NavLinkList } from "./NavLinkList"
import { useUiContext } from "hooks/context"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { adminMenu } from "../menus"

export const AdminMenuSidebar = () => {
  const {
    sideMenuAdministrationOpen: openAdministration,
    handleSideBarAdministration,
  } = useUiContext()

  return (
    <>
      <Divider />
      <List disablePadding>
        <ListItemButton onClick={handleSideBarAdministration}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Administración" />
          {openAdministration ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAdministration} timeout="auto" unmountOnExit>
          <List disablePadding>
            <NavLinkList list={adminMenu} pl={4} />
          </List>
        </Collapse>
      </List>
      <Divider />
    </>
  )
}
