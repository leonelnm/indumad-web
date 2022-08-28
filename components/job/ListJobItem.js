import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import ViewerEditor from "components/editor/ViewerEditor"
import useOnScreen from "hooks/useOnScreen"
import { getDate } from "utils/date"
import { JobCaption } from "./JobCaption"

export const ListJobItem = ({ job = {} }) => {
  const ref = useRef()
  const refValue = useOnScreen(ref)
  const [isRef, setIsRef] = useState(false)

  useEffect(() => {
    if (!isRef) setIsRef(refValue)
  }, [refValue])

  return (
    <article ref={ref}>
      {isRef ? (
        <Paper elevation={3} className="job">
          <div className="id-ext-date">
            <div>
              <Link href={`/job/${job.id}`}>
                <a>#{job.id}</a>
              </Link>
            </div>
            <div>{job.extReference ? job.extReference : "-"}</div>
            <div>{getDate(job.createdAt)}</div>
          </div>
          <div className="status">
            <JobCaption text="Estado" />
            <Typography variant="body1" component="span" pl={1}>
              <strong>{job.state}</strong>
            </Typography>
          </div>

          {job.client && (
            <div className="client">
              <JobCaption text="Cliente" />
              <Typography variant="body1" pl={1}>
                <strong>{job.client.name}</strong>
              </Typography>
            </div>
          )}

          {job.contact && (
            <div className="contact">
              <div>
                <JobCaption text="Contacto" />
                <strong>{job.contact.name}</strong>
              </div>
              <div>{job.contact.address}</div>
              <div>{job.contact.phone}</div>
            </div>
          )}
          <div className="info">
            <div>
              <JobCaption text="Actividad" />
              {job.reference.name}
            </div>
            <div>
              <JobCaption text="Descripción:" component="p" />
              <div className="simple-editor">
                <ViewerEditor text={job.incidentInfo} />
              </div>
            </div>
          </div>
          <div className="buttons">
            <Typography variant="caption">Acciones</Typography>
            <Link href={`/job/${job.id}`} passHref>
              <Button variant="outlined" size="small" component="a">
                Notas de Seguimiento
              </Button>
            </Link>
            <Link href={`/job/${job.id}`} passHref>
              <Button variant="outlined" size="small" component="a">
                Añadir Evidencias
              </Button>
            </Link>
            <Link href={`/job/${job.id}`} passHref>
              <Button variant="outlined" size="small" component="a">
                Mostrar Albaran
              </Button>
            </Link>
            <Link href={`/job/${job.id}`} passHref>
              <Button variant="outlined" size="small" component="a">
                Acceder
              </Button>
            </Link>
          </div>
        </Paper>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="rextangular" animation="wave" height={200} />
        </Stack>
      )}
    </article>
  )
}
