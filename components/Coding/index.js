import { Box, Typography } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"

import style from "./coding.module.css"

export const Coding = () => {
  return (
    <Box
      color={"#757575"}
      sx={{
        display: { xs: "flex" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "50vw",
        minHeight: "50vh",
      }}
    >
      <Box
        sx={{
          minHeight: "48px",
        }}
      >
        <Box className={style.loader} />
      </Box>
      <Box>
        <DashboardIcon sx={{ fontSize: 100 }} />
      </Box>
      <Typography variant="h5">Página en Construcción!</Typography>
    </Box>
  )
}
