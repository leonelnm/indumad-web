import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import { useContext } from "react"
import { UIContext } from "context"
import { NavMenu } from "./NavMenu"
import { userMenu } from "../menus"
import Link from "next/link"
import { messages } from "utils/messages"

export const Navbar = () => {
  const { openSideBar } = useContext(UIContext)

  return (
    <AppBar
      position="sticky"
      component="nav"
      role="navigation"
      aria-labelledby="main-navigation"
    >
      <Toolbar>
        <Box sx={{ display: { xs: "block" } }}>
          <IconButton
            size="large"
            color="inherit"
            edge="start"
            onClick={openSideBar}
          >
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          flex={1}
          sx={{
            display: { xs: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <ConstructionIcon sx={{ display: { xs: "block" }, mr: 1 }} /> */}
          <Typography
            sx={{
              typography: { sm: "h5" },
              display: { sm: "block", xs: "none" },
            }}
          >
            {messages.ui.appName}
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "flex" } }}>
          <Link href="/calendar" passHref>
            <IconButton component={"a"} color="inherit">
              <CalendarMonthIcon />
            </IconButton>
          </Link>

          <Divider orientation="vertical" flexItem variant="middle" />

          <Link href="/notifications" passHref>
            <IconButton component={"a"} color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>

          <Divider orientation="vertical" flexItem variant="middle" />

          <NavMenu list={userMenu} />
        </Box>

        <Box />
      </Toolbar>
    </AppBar>
  )
}
