import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
