import { Grid, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/router"

export const CustomTitle = ({
  title,
  icon = null,
  secondaryTitle = "",
  component = undefined,
}) => {
  const router = useRouter()
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      mb={1}
      spacing={1}
      aria-label={`customTitle-${title}`}
    >
      <Grid item>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      {icon && (
        <Grid item sx={{ display: "flex" }}>
          {icon}
        </Grid>
      )}
      <Grid item>{title}</Grid>
      <Grid item sx={{ flexGrow: 1 }}></Grid>
      {secondaryTitle && <Grid item>Secondary{title}</Grid>}
      {component && <Grid item>{component}</Grid>}
    </Grid>
  )
}
