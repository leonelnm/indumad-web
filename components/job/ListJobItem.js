import { Button, Paper } from "@mui/material"
import ViewerEditor from "components/editor/ViewerEditor"
import Link from "next/link"
import { getDate } from "utils/date"

export const ListJobItem = ({ job = {} }) => {
  return (
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
        <em>Estado: </em>
        <strong>{job.state}</strong>
      </div>

      {job.contact && (
        <div className="contact">
          <div>
            <em>Contacto: </em>
            <strong>{job.contact.name}</strong>
          </div>
          <div>{job.contact.address}</div>
          <div>{job.contact.phone}</div>
        </div>
      )}
      <div className="info">
        <div>
          <em>Actividad: </em>
          {job.reference.name}
        </div>
        <div>
          <p>
            <em>Descripción:</em>
          </p>
          <div className="simple-editor">
            <ViewerEditor text={job.incidentInfo} />
          </div>
        </div>
      </div>
      <div className="buttons">
        <Link href={`/job/${job.id}`} passHref>
          <Button component="a">Acceder</Button>
        </Link>
      </div>
    </Paper>
  )
}
