import { Grid } from "@mui/material"

export const CustomTitle = ({ title, icon = null }) => {
  return (
    <Grid container direction="row" alignItems="center" mb={2} spacing={1}>
      {icon && (
        <Grid item sx={{ display: "flex" }}>
          {icon}
        </Grid>
      )}
      <Grid item>{title}</Grid>
    </Grid>
  )
}
