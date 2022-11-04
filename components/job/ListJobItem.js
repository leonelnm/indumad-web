import { Box, Button, Paper, Skeleton, Stack, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import ViewerEditor from "components/editor/ViewerEditor"
import useOnScreen from "hooks/useOnScreen"
import { getDate } from "utils/date"
import { JobCaption } from "./JobCaption"
import { useAuthContext } from "hooks/context"
import { messages } from "utils/messages"

export const ListJobItem = ({ job = {} }) => {
  const { isGestor } = useAuthContext()
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
            {/* ID */}
            <div>
              <JobCaption text={messages.ui.job.id} />
              <Box sx={{ textAlign: "center" }}>
                <Link href={`/job/${job.id}`}>
                  <a>#{job.id}</a>
                </Link>
              </Box>
            </div>

            {/* Referencia Externa */}
            <div>
              <JobCaption text={messages.ui.job.externalReference} />
              <Box sx={{ textAlign: "center" }}>
                {job.extReference ? job.extReference : "-"}
              </Box>
            </div>

            {/* Fecha Creación */}
            <div>
              <JobCaption text={messages.ui.job.createdAt} />
              <Box sx={{ textAlign: "center" }}>{getDate(job.createdAt)}</Box>
            </div>
          </div>

          <div className="priority">
            <JobCaption text={messages.ui.job.level} />
            <Typography variant="body1" component="span" pl={1}>
              <strong>{job.priority}</strong>
            </Typography>
          </div>

          <div className="status">
            <JobCaption text={messages.ui.job.state} />
            <Typography variant="body1" component="span" pl={1}>
              <strong>{job.state}</strong>
            </Typography>
          </div>

          {job.client && (
            <div className="client">
              <JobCaption text={messages.ui.job.client} />
              <Typography variant="body1" pl={1}>
                <strong>{job.client.name}</strong>
              </Typography>
            </div>
          )}

          {job.contact && (
            <div className="contact">
              <div>
                <JobCaption text={messages.ui.job.contact} />
                <strong>{job.contact.name}</strong>
              </div>
              <div>{job.contact.address}</div>
              <div>{job.contact.phone}</div>
            </div>
          )}
          <div className="info">
            <div>
              <JobCaption text={messages.ui.job.reference} />
              {job.reference.name}
            </div>
            <div>
              <JobCaption text={messages.ui.job.description} component="p" />
              <div className="simple-editor">
                <ViewerEditor text={job.incidentInfo} />
              </div>
            </div>
          </div>
          <div className="buttons">
            {isGestor && (
              <Link href={`/admin/job/edit/${job.id}`} passHref>
                <Button variant="outlined" size="small" component="a">
                  {messages.ui.job.edit}
                </Button>
              </Link>
            )}

            <Link href={`/job/notes/${job.id}`} passHref>
              <Button
                variant="outlined"
                size="small"
                sx={{ display: { xs: "none", sm: "block" } }}
                component="a"
              >
                {messages.ui.job.followupNote}
              </Button>
            </Link>
            <Link href={`/job/evidences/${job.id}`} passHref>
              <Button
                variant="outlined"
                size="small"
                sx={{ display: { xs: "none", sm: "block" } }}
                component="a"
              >
                {messages.ui.job.evidence}
              </Button>
            </Link>
            <Link href={`/job/${job.id}`} passHref>
              <Button
                variant="outlined"
                size="small"
                sx={{ display: { xs: "none", sm: "block" } }}
                component="a"
              >
                {messages.ui.job.deliveryNote}
              </Button>
            </Link>
            <Link href={`/job/${job.id}`} passHref>
              <Button variant="outlined" size="small" component="a">
                {messages.ui.job.detail}
              </Button>
            </Link>
          </div>
        </Paper>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" animation="wave" height={200} />
        </Stack>
      )}
    </article>
  )
}
