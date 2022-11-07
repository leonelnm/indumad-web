import { ListJobByEmployee } from "components/job/ListJobByEmployee"
import { MainLayout } from "components/layouts"
import { Toaster } from "react-hot-toast"

export default function HomePage() {
  return (
    <MainLayout title="Trabajos">
      <Toaster position="top-right" reverseOrder={false} />
      <ListJobByEmployee />
    </MainLayout>
  )
}
