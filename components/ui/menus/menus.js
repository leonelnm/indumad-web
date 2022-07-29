import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EngineeringIcon from "@mui/icons-material/Engineering"
import PeopleIcon from "@mui/icons-material/People"

export const mainMenu = [
  {
    text: "Trabajos",
    path: "/",
    icon: <EngineeringIcon sx={{ fontSize: "2rem" }} />,
  },
  { text: "Facturación", path: "/facturacion", icon: <AccountBalanceIcon /> },
]

export const adminMenu = [
  { text: "Usuarios", path: "/user/users", icon: <PeopleIcon /> },
]

export const calendarMenu = [
  { text: "Ver Agenda", path: "/calendar", icon: <CalendarMonthIcon /> },
]

export const userMenu = [
  { text: "Ver Perfil", path: "/user/newprofile" },
  { text: "Cerrar Sesión", path: "/logout" },
]
