import { ModalIndumad } from "components/modal/Modal"
import { messages } from "utils/messages"
import ScheduleVisit from "./ScheduleVisit"

export const ScheduleModal = ({ handleOpen, state }) => {
  return (
    <ModalIndumad
      title={messages.ui.schedule.modalTitle}
      handleOpen={handleOpen}
      big={true}
      show={state.showModal}
    >
      <ScheduleVisit jobId={state.jobId} closeModal={handleOpen} />
    </ModalIndumad>
  )
}
