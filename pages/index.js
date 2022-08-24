import { Typography } from "@mui/material"
import { ListJobByEmployee } from "components/job/ListJobByEmployee"
import { MainLayout } from "components/layouts"

export default function HomePage() {
  return (
    <MainLayout title="Trabajos">
      <Typography variant="h1" color="primary">
        Trabajos
      </Typography>

      <ListJobByEmployee />
    </MainLayout>
  )
}
