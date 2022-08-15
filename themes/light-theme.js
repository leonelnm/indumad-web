import { createTheme } from "@mui/material"
import { red, grey } from "@mui/material/colors"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#e65100",
    },
    error: {
      main: red[700],
    },
    warning: {
      main: "#ff9800",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {},
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "4rem",
          fontWeight: 500,
        },
        h2: {
          fontSize: "3.3rem",
          fontWeight: 400,
        },
        h3: {
          fontSize: "2.7rem",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginLeft: "0.25rem",
          marginRight: "0.25rem",
          backgroundColor: grey[500],
        },
      },
    },
  },
})
