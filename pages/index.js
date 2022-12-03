import { ScheduleModal } from "components/calendar/ScheduleModal"
import { ListJobByEmployee } from "components/job/ListJobByEmployee"
import { MainLayout } from "components/layouts"
import { useState } from "react"
import { Toaster } from "react-hot-toast"

const INITIAL_STATE = {
  showModal: false,
  id: undefined,
}
export default function HomePage() {
  const [showModal, setShowModal] = useState(INITIAL_STATE)

  const closeModal = () => {
    setShowModal(INITIAL_STATE)
  }

  const openModal = (jobId) => {
    setShowModal({
      showModal: true,
      jobId,
    })
  }

  return (
    <MainLayout title="Trabajos">
      <Toaster position="top-right" reverseOrder={false} />
      <ListJobByEmployee handleOpenScheduleModal={openModal} />

      <ScheduleModal state={showModal} handleOpen={closeModal} />
    </MainLayout>
  )
}
