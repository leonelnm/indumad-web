import { ScheduleModal } from "components/calendar/ScheduleModal"
import { ListJobByEmployee } from "components/job/ListJobByEmployee"
import { MainLayout } from "components/layouts"
import { JobProvider } from "context/job"
import { Toaster } from "react-hot-toast"

export default function HomePage() {
  return (
    <MainLayout title="Trabajos">
      <Toaster position="top-right" reverseOrder={false} />
      <ListJobByEmployee />

      <ScheduleModal />
    </MainLayout>
  )
}

HomePage.provider = JobProvider
