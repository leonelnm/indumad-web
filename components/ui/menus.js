import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EngineeringIcon from "@mui/icons-material/Engineering"
import PeopleIcon from "@mui/icons-material/People"
import { Documentation, ProfileInfo, Security } from "components/user"
import { CreateUser } from "components/user/CreateUser"
import { ListUsers } from "components/user/ListUsers"

export const mainMenu = [
  {
    text: "Trabajos",
    path: "/",
    icon: <EngineeringIcon sx={{ fontSize: "2rem" }} />,
  },
  { text: "Facturación", path: "/facturacion", icon: <AccountBalanceIcon /> },
]

export const adminMenu = [
  { text: "Usuarios", path: "/admin/users", icon: <PeopleIcon /> },
]

export const calendarMenu = [
  { text: "Ver Agenda", path: "/calendar", icon: <CalendarMonthIcon /> },
]

export const userMenu = [{ text: "Ver Perfil", path: "/profile/" }]

export const userProfileTabMenu = [
  {
    text: "Mis Datos",
    default: {
      path: `/profile/`,
    },
    path: `/profile/`,
    component: <ProfileInfo />,
  },
  {
    text: "Seguridad",
    path: `/profile/`,
    query: "secutiry",
    component: <Security />,
  },
  {
    text: "Mis Docs",
    path: `/profile/`,
    query: "documentation",
    component: <Documentation />,
  },
]

export const adminUserTabMenu = [
  {
    text: "Ver Usuarios",
    default: {
      path: "/admin/users",
    },
    path: "/admin/users",
    component: <ListUsers />,
  },
  {
    text: "Crear nuevo usuario",
    path: "/admin/users",
    query: "user",
    component: <CreateUser />,
  },
]
