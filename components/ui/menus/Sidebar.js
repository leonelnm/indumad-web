import { Divider, Drawer, List, Typography } from "@mui/material"
import ConstructionIcon from "@mui/icons-material/Construction"
import { Box } from "@mui/system"
import { mainMenu, calendarMenu } from "../menus"
import { useAuthContext, useUiContext } from "hooks/context"
import { NavList } from "./NavList"
import { NavLinkList } from "./NavLinkList"
import { isGestor } from "utils/roles"
import { AdminMenuSidebar } from "./AdminMenuSidebar"

export const Sidebar = () => {
  const { user } = useAuthContext()
  const isGEstor = isGestor({ role: user?.role })

  const { sideMenuOpen, closeSideBar } = useUiContext()

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideBar}>
      <Box sx={{ width: "250px" }}>
        <Box
          sx={{
            padding: "1rem",
            display: { xs: "flex" },
            alignItems: "center",
            bgcolor: { xs: "primary.main", sm: "inherit" },
            color: { xs: "white", sm: "inherit" },
          }}
        >
          <ConstructionIcon sx={{ display: { xs: "block" }, mr: 1 }} />
          <Typography
            variant="h5"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Menu
          </Typography>

          <Typography
            variant="body"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <strong>Servicios Navalpar S.L.</strong>
          </Typography>
        </Box>

        <NavList list={mainMenu} />

        <Divider />

        {/* Agenda */}
        <List disablePadding>
          <NavLinkList list={calendarMenu} />
        </List>

        {/* Administracion */}
        {isGEstor && <AdminMenuSidebar />}
      </Box>
    </Drawer>
  )
}
