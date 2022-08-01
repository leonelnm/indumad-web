import { Typography } from "@mui/material"
import { Coding } from "components/Coding"
import { MainLayout } from "components/layouts"

export default function HomePage() {
  return (
    <MainLayout title="Trabajos">
      <Typography variant="h1" color="primary">
        Trabajos
      </Typography>
      <Coding />
    </MainLayout>
  )
}
