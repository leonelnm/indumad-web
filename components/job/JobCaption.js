import { Typography } from "@mui/material"

export const JobCaption = ({
  variant = "caption",
  text = "",
  component = "span",
}) => {
  return (
    <Typography
      pr={1}
      variant={variant}
      component={component}
      sx={{ fontStyle: "italic" }}
    >
      {text}:
    </Typography>
  )
}
