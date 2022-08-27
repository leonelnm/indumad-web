import { Typography } from "@mui/material"

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Typography variant="body2" component={"strong"} sx={{ fontWeight: 900 }}>
        Servicios Navalpar S.L.
      </Typography>{" "}
      {new Date().getFullYear()}
    </Typography>
  )
}
