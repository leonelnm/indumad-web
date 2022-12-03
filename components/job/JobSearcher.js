import SearchOutlined from "@mui/icons-material/SearchOutlined"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material"
import { FilterStatus } from "./filter/FilterStatus"

export const JobSearcher = ({
  onChange,
  value,
  reset,
  showReset = false,
  status,
  setStatus,
}) => {
  return (
    <Stack
      flexDirection={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 0 }}
    >
      <FilterStatus status={status} setStatus={setStatus} />
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        autoComplete="off"
        placeholder="Buscar por Dirección o Contacto"
        margin="none"
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),

          endAdornment: showReset && (
            <InputAdornment position="end">
              <IconButton onClick={() => reset()}>
                <CancelOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  )
}
