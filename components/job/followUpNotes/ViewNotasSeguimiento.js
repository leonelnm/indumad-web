import { indumadClient, indumadRoutes } from "api"
import { useAuthContext } from "hooks/context"
import { useState } from "react"
import { AddNote } from "./AddNote"
import { ListNotes } from "./ListNotes"

export const ViewNotasSeguimiento = ({ jobId }) => {
  const { user } = useAuthContext()
  const [notes, setNotes] = useState([])

  const handlerSubmit = async (data) => {
    const previousNotes = notes

    setNotes([
      ...notes,
      {
        id: new Date().getTime(),
        createdAt: new Date(),
        ownerId: user.id,
        readByGestor: true,
        readByEmployee: true,
        text: data,
      },
    ])
    const noteToSend = { text: data }
    const { error, data: newNote } = await indumadClient({
      method: "post",
      url: `${indumadRoutes.notes.basePath}/${jobId}`,
      body: noteToSend,
    })
    if (error) {
      setNotes(previousNotes)
    }

    return { error, data: newNote }
  }

  return (
    <>
      <ListNotes jobId={jobId} notes={notes} setNotes={setNotes} />
      <AddNote handlerSubmit={handlerSubmit} />
    </>
  )
}
