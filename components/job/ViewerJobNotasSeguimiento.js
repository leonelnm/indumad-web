import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { useState } from "react"

export const ViewerJobNotasSeguimiento = () => {
  const [notes] = useState([1, 2, 3])

  return (
    <Card variant="outlined">
      <CardHeader
        titleTypographyProps={{ fontSize: "1.25em" }}
        title="Notas de Seguimiento"
      />
      <CardContent>
        {notes.map((note) => (
          <Typography key={note}>Note {note}</Typography>
        ))}
      </CardContent>
    </Card>
  )
}
