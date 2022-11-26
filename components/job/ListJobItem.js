import {
  Badge,
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import ViewerEditor from "components/editor/ViewerEditor"
import useOnScreen from "hooks/useOnScreen"
import { getDate } from "utils/date"
import { JobCaption } from "./JobCaption"
import { useAuthContext } from "hooks/context"
import { messages } from "utils/messages"
import { LazyDownloadPdfButton } from "components/pdf/LazyDownloadPdfButton"
import { DeliveryNotePdf } from "components/pdf/DeliveryNotePdf"
import { ScheduleButton } from "components/calendar/ScheduleButton"

export const ListJobItem = ({ job = {}, handleOpenScheduleModal }) => {
  const { isGestor } = useAuthContext()
  const ref = useRef()
  const refValue = useOnScreen(ref)
  const [isRef, setIsRef] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
            <Typography variant="body1" component="span" pl={{ sm: 1 }}>
              <strong>{job.priority}</strong>
            </Typography>
          </div>

          <div className="status">
            <JobCaption text={messages.ui.job.state} />
            <Typography variant="body1" component="span" pl={{ sm: 1 }}>
              <strong>{job.state}</strong>
            </Typography>
          </div>
          {isGestor && (
            <div className="worker">
              <JobCaption text={messages.ui.job.worker} />
              <Typography variant="body1" component="span" pl={{ sm: 1 }}>
                {job.employee
                  ? `${job.employee.name} ${job.employee.lastname}`
                  : messages.ui.job.workerEmpty}
              </Typography>
            </div>
          )}

          {job.client && (
            <div className="client">
              <JobCaption text={messages.ui.job.client} />
              <Typography variant="body2" pl={{ sm: 1 }}>
                {job.client.name}
              </Typography>
            </div>
          )}

          {job.contact && (
            <div className="contact">
              <div className="info-box">
                <JobCaption text={messages.ui.job.contact} />
                <strong>{job.contact.name}</strong>
              </div>
              <div className="info-box">
                <JobCaption text={messages.ui.job.address} />
                {job.contact.address}
              </div>
              <div className="info-box">
                <JobCaption text={messages.ui.job.phone} />
                {job.contact.phone}
              </div>
            </div>
          )}
          <div className="info">
            <div>
              <JobCaption text={messages.ui.job.reference} />
              {`${job.reference.name} - ${job.guild.name}`}
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

            <ScheduleButton job={job.id} openModal={handleOpenScheduleModal} />

            <Link
              href={{
                pathname: `/job/notes/${job.id}`,
                query: { pendingApproval: job.pendingApproval },
              }}
              passHref
            >
              <Badge
                color="secondary"
                badgeContent={job.unreadMessages}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ display: { xs: "none", sm: "block" } }}
                  component="a"
                >
                  {messages.ui.job.followupNote}
                </Button>
              </Badge>
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

            <LazyDownloadPdfButton
              filename={`${messages.ui.pdf.deliveryNoteNamePdf}${job.id}`}
              text={messages.ui.job.showDeliveryNote}
              loadingText={messages.ui.job.loadingDeliveryNote}
              hasDeliveryNote={job.hasDeliveryNote}
            >
              <DeliveryNotePdf job={job} />
            </LazyDownloadPdfButton>

            <Link href={`/job/${job.id}`} passHref>
              <Badge
                color="secondary"
                badgeContent={job.unreadMessages}
                invisible={!isMobile}
              >
                <Button variant="outlined" size="small" component="a" fullWidth>
                  {messages.ui.job.detail}
                </Button>
              </Badge>
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
