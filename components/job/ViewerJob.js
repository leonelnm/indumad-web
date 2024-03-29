import { Box, Stack } from "@mui/material"
import { CardCollapse } from "components/collapse/CardCollapse"
import { InnerCardCollapse } from "components/collapse/InnerCardCollapse"
import ViewerEditor from "components/editor/ViewerEditor"
import { DeliveryNotePdf } from "components/pdf/DeliveryNotePdf"
import { LazyDownloadPdfButton } from "components/pdf/LazyDownloadPdfButton"
import { getDate } from "utils/date"
import { messages } from "utils/messages"
import { CaptionData } from "./CaptionData"
import { ViewerJobEvidences } from "./ViewerJobEvidences"
import { ViewerJobNotasSeguimiento } from "./ViewerJobNotasSeguimiento"
import { ScheduleButton } from "components/calendar/ScheduleButton"

export const ViewerJob = ({ job = {} }) => {
  return (
    <Stack pt={1} spacing={2}>
      <Stack flexDirection="row" justifyContent="space-between">
        <LazyDownloadPdfButton
          filename={`${messages.ui.pdf.deliveryNoteNamePdf}${job.id}`}
          text={messages.ui.job.showDeliveryNote}
          loadingText={messages.ui.job.loadingDeliveryNote}
          hasDeliveryNote={job.hasDeliveryNote}
          color="secondary"
        >
          <DeliveryNotePdf job={job} />
        </LazyDownloadPdfButton>

        <ScheduleButton job={job.id} sx={{}} color="secondary" />
      </Stack>

      <CardCollapse title="Información General" variant="outlined">
        {/* Info */}
        <Box p={1}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <CaptionData title={messages.ui.job.id} data={`#${job.id}`} />
            <CaptionData
              title={messages.ui.job.createdAt}
              data={getDate(job.createdAt)}
            />
          </Box>
          <CaptionData
            title={messages.ui.job.externalReference}
            data={job.extReference}
          />
          <CaptionData title={messages.ui.job.level} data={job.priority} />
          <CaptionData title={messages.ui.job.state} data={job.state} />

          <CaptionData title={messages.ui.job.guild} data={job.guild.name} />
          <CaptionData
            title={messages.ui.job.reference}
            data={job.reference.name}
          />
        </Box>

        {/* client */}
        <InnerCardCollapse title={messages.ui.job.client}>
          <CaptionData title={messages.ui.job.name} data={job.client.name} />
          <CaptionData title={messages.ui.job.nif} data={job.client.nif} />
          <CaptionData title={messages.ui.job.phone} data={job.client.phone} />
        </InnerCardCollapse>
        {/* contact */}
        <InnerCardCollapse title={messages.ui.job.contact}>
          <CaptionData title={messages.ui.job.name} data={job.contact.name} />
          <CaptionData
            title={messages.ui.job.address}
            data={job.contact.address}
          />
          <CaptionData title={messages.ui.job.phone} data={job.contact.phone} />
        </InnerCardCollapse>
        {/* activity */}
        <InnerCardCollapse
          title="Descripción"
          border={false}
          openOnStart={false}
        >
          <div className="simple-editor">
            <ViewerEditor text={job.incidentInfo} />
          </div>
        </InnerCardCollapse>
      </CardCollapse>
      <ViewerJobNotasSeguimiento jobId={job.id} />
      <ViewerJobEvidences jobId={job.id} />
    </Stack>
  )
}
