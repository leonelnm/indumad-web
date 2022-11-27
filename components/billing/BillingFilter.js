import { Stack, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { range } from "utils/utils"

export const BillingFilter = ({ year, setYear }) => {
  // const years = range(2022, new Date().getFullYear())
  const years = range(2022, 2024)

  const handlerSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <Stack
      flexDirection={"row"}
      component={"form"}
      onSubmit={handlerSubmit}
      sx={{ maxWidth: "sm" }}
    >
      <FormControl fullWidth>
        <InputLabel id="select-year">Seleccionar Año</InputLabel>
        <Select
          labelId="select-year"
          value={year}
          label="Seleccionar Año"
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
