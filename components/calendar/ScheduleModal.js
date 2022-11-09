import { ModalIndumad } from "components/modal/Modal"
import { useJobContext } from "hooks/context"
import ScheduleVisit from "./ScheduleVisit"

export const ScheduleModal = () => {
  const { job, closeModal } = useJobContext()

  return (
    <ModalIndumad
      title="Agendar Cita"
      handleOpen={closeModal}
      big={true}
      show={job.showModal}
    >
      <ScheduleVisit jobId={job.id} />
    </ModalIndumad>
  )
}
