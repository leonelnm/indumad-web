import { useEffect, useState } from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker"
import { esES } from "@mui/x-date-pickers/locales"
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { messages } from "utils/messages"
import { createSchedule } from "services/scheduleService"
import toast from "react-hot-toast"
import { useJobContext } from "hooks/context"

export default function ScheduleVisit({ jobId = undefined }) {
  const [error, setError] = useState("")
  const { closeModal } = useJobContext()

  const initialSchedule = {
    date: dayjs(new Date()),
    duration: 1,
    description: jobId
      ? `${messages.ui.schedule.visitJob}${jobId}`
      : messages.ui.schedule.visit,
  }

  const [schedule, setSchedule] = useState(() => initialSchedule)

  useEffect(() => {
    setSchedule(initialSchedule)
  }, [jobId])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleChangeTime = (value) => {
    if (dayjs(value).isBefore(new Date())) {
      setError(messages.schedule.beforeError)
    } else {
      setError("")
    }

    setSchedule({
      ...schedule,
      date: value,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSchedule({
      ...schedule,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    if (error) {
      return
    }

    e.preventDefault()

    const data = {
      jobId,
      dateTime: schedule.date.format(),
      duration: schedule.duration,
      description: schedule.description,
    }

    const { ok } = await createSchedule({ data })

    if (ok) {
      toast.success(messages.schedule.success, { duration: 5000 })
      closeModal()
    } else {
      toast.error(messages.schedule.error)
    }
  }

  return (
    <Container maxWidth="sm">
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <Stack spacing={3} component="form" noValidate autoComplete="off">
          <Typography
            variant="body1"
            fontStyle="italic"
            fontWeight={500}
            sx={{ color: "gray" }}
          >
            Servicio {jobId}
          </Typography>
          {isMobile ? (
            <MobileDateTimePicker
              ampm={false}
              inputFormat="DD/MM/YYYY HH:mm"
              label="Seleccionar fecha y hora"
              onChange={handleChangeTime}
              renderInput={(params) => (
                <TextField {...params} error={!!error} helperText={error} />
              )}
              value={schedule.date}
            />
          ) : (
            <DateTimePicker
              ampm={false}
              inputFormat="DD/MM/YYYY HH:mm"
              label="Seleccionar fecha y hora"
              onChange={handleChangeTime}
              renderInput={(params) => (
                <TextField {...params} error={!!error} helperText={error} />
              )}
              showToolbar
              value={schedule.date}
              componentsProps={{
                actionBar: {
                  actions: ["cancel", "accept"],
                },
              }}
            />
          )}

          <FormControl fullWidth>
            <InputLabel id="duration-select-label">Duración</InputLabel>
            <Select
              labelId="duration-select-label"
              id="duration-select"
              label="Duración"
              name="duration"
              value={schedule.duration}
              onChange={handleChange}
            >
              <MenuItem value={0.5}>30m</MenuItem>
              {[...Array(8).keys()].map((i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}h
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={messages.ui.job.description}
            name="description"
            type="text"
            value={schedule.description}
            onChange={handleChange}
          />

          <Stack flexDirection="row">
            <Button
              type="submit"
              disabled={error !== ""}
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </Container>
  )
}
