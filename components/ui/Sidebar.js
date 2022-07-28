import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import WorkIcon from "@mui/icons-material/Work"
import { useUiContext } from "hooks/context"

const menuItems = [
  "Trabajos",
  "Facturación",
  "Agenda",
  "Notificaciones",
  "Perfil",
]

export const Sidebar = () => {
  const { sideMenuOpen, closeSideBar } = useUiContext()

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideBar}>
      <Box sx={{ width: "250px" }}>
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
