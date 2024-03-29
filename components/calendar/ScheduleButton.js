import { Button } from "@mui/material"
import { useJobContext } from "hooks/context"
import EventIcon from "@mui/icons-material/Event"

export const ScheduleButton = ({
  variant = "outlined",
  color = "primary",
  job,
  sx = { display: { xs: "none", sm: "inline-flex" } },
  disabled = false,
}) => {
  const { openModal } = useJobContext()
  return (
    <Button
      variant={variant}
      color={color}
      size="small"
      onClick={() => openModal(job)}
      sx={sx}
      endIcon={<EventIcon />}
      disabled={disabled}
    >
      Agendar Cita
    </Button>
  )
}
