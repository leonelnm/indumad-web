import { Typography } from "@mui/material"
import { CardCollapse } from "components/collapse/CardCollapse"
import { useState } from "react"

export const ViewerJobNotasSeguimiento = () => {
  const [notes] = useState([1, 2, 3])

  return (
    <CardCollapse title="Notas de Seguimiento">
      {notes.map((note) => (
        <Typography key={note}>Note {note}</Typography>
      ))}
    </CardCollapse>
  )
}
