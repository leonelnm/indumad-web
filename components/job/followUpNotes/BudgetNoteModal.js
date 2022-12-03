import { ModalIndumad } from "components/modal/Modal"
import { messages } from "utils/messages"
import { AddNote } from "./AddNote"

export const BudgetNoteModal = ({ handleOpen, state, handlerSubmit }) => {
  return (
    <ModalIndumad
      title={messages.ui.budget.title}
      handleOpen={handleOpen}
      // big={true}
      show={state.showModal}
    >
      <AddNote handlerSubmit={handlerSubmit} isBudget={true} />
    </ModalIndumad>
  )
}
