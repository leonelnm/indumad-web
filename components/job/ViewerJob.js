import { Box } from "@mui/material"
import { CardCollapse } from "components/collapse/CardCollapse"
import { InnerCardCollapse } from "components/collapse/InnerCardCollapse"
import ViewerEditor from "components/editor/ViewerEditor"
import { getDate } from "utils/date"
import { JobCaption } from "./JobCaption"
import { ViewerJobNotasSeguimiento } from "./ViewerJobNotasSeguimiento"

export const ViewerJob = ({ job = {} }) => {
  console.log(job)
  return (
    <Box pt={1} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <CardCollapse title="Información General" variant="outlined">
        {/* Info */}
        <div>
          <div>{getDate(job.createdAt)}</div>
          <div>#{job.id}</div>
          <div>{job.extReference}</div>
          <div>{job.state}</div>
          <div>{job.priority}</div>
        </div>

        {/* client */}
        <InnerCardCollapse title="Cliente">
          <div>
            <div>{job.client.name}-name</div>
            <div>{job.client.nif}-nif</div>
            <div>{job.client.phone}-phone</div>
          </div>
        </InnerCardCollapse>
        {/* contact */}
        <InnerCardCollapse title="Contacto">
          <div>{job.contact.name}-name</div>
          <div>{job.contact.address}-address</div>
          <div>{job.contact.phone}-phone</div>
        </InnerCardCollapse>
        {/* activity */}
        <div>{job.guild.name}</div>
        <div>{job.reference.name}</div>

        <div>
          <JobCaption text="Descripción" component="p" />
          <div className="simple-editor">
            <ViewerEditor text={job.incidentInfo} />
          </div>
        </div>
      </CardCollapse>
      <ViewerJobNotasSeguimiento />
    </Box>
  )
}
