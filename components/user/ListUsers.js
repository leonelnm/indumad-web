import { Alert, Box } from "@mui/material"
import { Container } from "@mui/system"

import { indumadRoutes } from "api"
import { useAxios } from "hooks/useAxios"
import { DotFlash } from "components/loaders/DotFlash"
import { messages } from "utils/messages"
import { DataGrid, esES } from "@mui/x-data-grid"
import Link from "next/link"

export const ListUsers = () => {
  const { error, isLoading, data } = useAxios({
    url: indumadRoutes.user,
  })

  const columns = [
    { field: "username", headerName: "Usuario", width: 150 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 250, editable: true },
    { field: "role", headerName: "Rol", width: 150 },
    {
      field: "detail",
      headerName: "Detalle",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return <Link href={`users/${row.id}`}>Ver Detalle</Link>
      },
    },
  ]

  const rows = data
    ? data.map((user) => ({
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
      }))
    : []

  return (
    <Container disableGutters>
      {isLoading && <DotFlash />}
      {error && (
        <Box>
          <Alert severity="warning">{messages.user.error_list}</Alert>
        </Box>
      )}

      <Box sx={{ height: 400, width: "100%" }}>
        {!isLoading && (
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        )}
      </Box>
    </Container>
  )
}
