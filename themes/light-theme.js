import { createTheme } from "@mui/material"
import { grey, red } from "@mui/material/colors"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[200],
    },
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red[300],
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {},
    },
  },
})
