import { indumadClient, indumadRoutes } from "api"
import { CardCollapse } from "components/collapse/CardCollapse"
import { useAuthContext } from "hooks/context"
import { useState } from "react"
import { AddNote } from "./followUpNotes/AddNote"
import { ListNotes } from "./followUpNotes/ListNotes"

export const ViewerJobNotasSeguimiento = ({ jobId = "" }) => {
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
    console.log({ newNote })
    if (error) {
      console.log("No se pudo añadir nota, por favor, vuelva a intentar!")
      setNotes(previousNotes)
    }

    return { error, data: newNote }
  }

  return (
    <CardCollapse title="Notas de Seguimiento">
      <ListNotes jobId={jobId} notes={notes} setNotes={setNotes} />
      <AddNote handlerSubmit={handlerSubmit} />
    </CardCollapse>
  )
}
