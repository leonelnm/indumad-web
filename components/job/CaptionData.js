import { Box, Typography } from "@mui/material"
import { JobCaption } from "./JobCaption"

export const CaptionData = ({ title = "", data = "" }) => {
  return (
    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
      <JobCaption text={title} />
      <Typography>{data || "-"}</Typography>
    </Box>
  )
}
