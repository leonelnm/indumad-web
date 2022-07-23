import { Typography } from "@mui/material"
import { MainLayout } from "components/layouts"
import { Dots } from "components/loaders/Dots"
import { Loader } from "components/loaders/Loader"
import { LoaderPage } from "components/loaders/LoaderPage"
import { Searcher } from "components/loaders/Searcher"

export default function HomePage() {
  return (
    <MainLayout>
      <Typography variant="h1" color="primary">
        Home
      </Typography>
      <Loader />
      <LoaderPage />
      <Searcher />
      <Dots />
    </MainLayout>
  )
}
