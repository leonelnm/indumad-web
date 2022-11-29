import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useAuthContext } from "hooks/context"
import { getJobStatusByRole } from "utils/JobStatesEnum"

export const FilterStatus = ({ status = "Todos", setStatus }) => {
  const {
    user: { role },
  } = useAuthContext()
  const statusList = getJobStatusByRole({ role })

  return (
    <FormControl size="small" sx={{ minWidth: "10rem" }}>
      <InputLabel id="select-state">Estado</InputLabel>
      <Select
        size="small"
        labelId="select-state"
        value={status}
        label="Estado"
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem key="Todos" value="*">
          Todos
        </MenuItem>
        {statusList.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
