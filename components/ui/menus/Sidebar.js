import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import ConstructionIcon from "@mui/icons-material/Construction"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box } from "@mui/system"
import { mainMenu, adminMenu, calendarMenu } from "../menus"
import { useUiContext } from "hooks/context"
import { NavList } from "./NavList"
import { NavLinkList } from "./NavLinkList"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

export const Sidebar = () => {
  const {
    sideMenuOpen,
    closeSideBar,
    sideMenuAdministrationOpen: openAdministration,
    handleSideBarAdministration,
  } = useUiContext()

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideBar}>
      <Box sx={{ width: "250px" }}>
        <Box
          sx={{
            padding: "1rem",
            display: { xs: "flex" },
            alignItems: "center",
          }}
        >
          <ConstructionIcon sx={{ display: { xs: "block" }, mr: 1 }} />
          <Typography variant="h5">Menu</Typography>
        </Box>

        <NavList list={mainMenu} />

        <Divider />

        {/* Agenda */}
        <List disablePadding>
          <NavLinkList list={calendarMenu} />
        </List>
        <Divider />

        {/* Administracion */}
        <List>
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
      </Box>
    </Drawer>
  )
}

/* <Link href={profile} passHref>
            <ListItem
              className={asPath === profile ? "activeLink" : ""}
              button
              component="a"
              onClick={closeSideBar}
            >
              <ListItemText primary="Mi Perfil" />
            </ListItem>
          </Link> */
