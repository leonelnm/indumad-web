import { ListJobByEmployee } from "components/job/ListJobByEmployee"
import { MainLayout } from "components/layouts"

export default function HomePage() {
  return (
    <MainLayout title="Trabajos">
      <ListJobByEmployee />
    </MainLayout>
  )
}
