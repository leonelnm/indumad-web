import SearchOutlined from "@mui/icons-material/SearchOutlined"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import { IconButton, InputAdornment, TextField } from "@mui/material"

export const JobSearcher = ({ onChange, value, reset, showReset = false }) => {
  return (
    <TextField
      fullWidth
      id="standard-bare"
      size="small"
      variant="outlined"
      autoComplete="off"
      placeholder="Buscar por Dirección o Contacto"
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
  )
}
