import { indumadClient, indumadRoutes } from "api"
import { DotFlash } from "components/loaders/DotFlash"
import { useAuthContext } from "hooks/context"
import { useAxios } from "hooks/useAxios"
import { useState } from "react"
import toast from "react-hot-toast"
import { messages } from "utils/messages"
import { AcceptBudget } from "./AcceptBudget"
import { AddBudgetNoteButton } from "./AddBudgetNoteButton"
import { AddNote } from "./AddNote"
import { BudgetNoteModal } from "./BudgetNoteModal"
import { JobCompletedButton } from "./JobCompletedButton"
import { ListNotes } from "./ListNotes"

export const ViewNotasSeguimiento = ({ jobId, job, isLoading = false }) => {
  const { user, isGestor } = useAuthContext()
  // const [notes, setNotes] = useState([])

  const {
    error,
    isLoadingNote,
    data: notes,
    setData: setNotes,
  } = useAxios({
    url: `${indumadRoutes.notes.basePath}/${jobId}`,
  })

  const [budgetNote, setBudgetNote] = useState({
    showModal: false,
    jobId: undefined,
  })

  const openBudgetNoteModal = () => {
    setBudgetNote({ showModal: true, jobId })
  }

  const closeBudgetNoteModal = () => {
    setBudgetNote({
      showModal: false,
      jobId: undefined,
    })
  }

  const addTmpNote = ({ text, newNote = undefined }) => {
    setNotes([
      ...notes,
      newNote || {
        id: new Date().getTime(),
        createdAt: new Date(),
        ownerId: user.id,
        readByGestor: true,
        readByEmployee: true,
        text,
      },
    ])
  }

  const handlerSubmit = async (text) => {
    const previousNotes = notes

    addTmpNote({ text })

    const noteToSend = { text }
    const { error, data: newNote } = await indumadClient({
      method: "post",
      url: `${indumadRoutes.notes.basePath}/${jobId}`,
      body: noteToSend,
    })
    if (error) {
      setNotes(previousNotes)
      toast.error(messages.notes.created.fail, { duration: 6000 })
    }

    return { error, data: newNote }
  }

  const handlerSubmitBudget = async (data) => {
    const { information: text, budget } = data

    const noteToSend = { text, budget }
    const { error, data: newNote } = await indumadClient({
      method: "post",
      url: `${indumadRoutes.notes.sendBudget}/${jobId}`,
      body: noteToSend,
    })
    if (error) {
      toast.error(messages.notes.budget.fail, { duration: 6000 })
    } else {
      addTmpNote({ newNote })
      toast.success(messages.notes.budget.sucess, { duration: 5000 })
      closeBudgetNoteModal()
    }

    return { error, data: newNote }
  }

  const handlerAcceptBudget = async (approve) => {
    const data = { approve }
    const { error, data: newNote } = await indumadClient({
      method: "post",
      url: `${indumadRoutes.notes.approveBudget}/${jobId}`,
      body: data,
    })
    if (error) {
      toast.error(messages.notes.budget.failApprove, { duration: 6000 })
    } else {
      addTmpNote({ newNote })
      toast.success(
        approve
          ? messages.notes.budget.approved
          : messages.notes.budget.rejected,
        { duration: 5000 }
      )
    }
  }

  const handlerFinishJob = async () => {
    const { error, data: newNote } = await indumadClient({
      method: "post",
      url: `${indumadRoutes.job.completed}/${jobId}`,
    })
    if (error) {
      toast.error(messages.job.completed.fail, { duration: 6000 })
    } else {
      addTmpNote({ newNote })
      toast.success(messages.job.completed.success, { duration: 5000 })
    }
  }

  return (
    <>
      {isLoading ? (
        <DotFlash />
      ) : (
        <>
          {job.allowSendBudget && (
            <AddBudgetNoteButton
              handlerOpenModal={openBudgetNoteModal}
              state={budgetNote}
            />
          )}

          {isGestor && job.pendingApproval && (
            <AcceptBudget handleAction={handlerAcceptBudget} />
          )}

          {job.inProgress && (
            <JobCompletedButton handlerClick={handlerFinishJob} />
          )}

          <BudgetNoteModal
            handleOpen={closeBudgetNoteModal}
            state={budgetNote}
            handlerSubmit={handlerSubmitBudget}
          />
        </>
      )}

      {/* <ListNotes jobId={jobId} notes={notes} setNotes={setNotes} /> */}
      <ListNotes error={error} isLoading={isLoadingNote} notes={notes} />
      <AddNote handlerSubmit={handlerSubmit} />
    </>
  )
}
