import { Box, Card, CardContent } from "@mui/material"
import { CustomCollapse } from "components/collapse/CustomCollapse"
import ViewerEditor from "components/editor/ViewerEditor"
import { getDate } from "utils/date"
import { JobCaption } from "./JobCaption"
import { ViewerJobNotasSeguimiento } from "./ViewerJobNotasSeguimiento"

export const ViewerJob = ({ job = {} }) => {
  console.log(job)
  return (
    <Box pt={1} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card variant="outlined">
        <CardContent>
          {/* Info */}
          <div>
            <div>{getDate(job.createdAt)}</div>
            <div>#{job.id}</div>
            <div>{job.extReference}</div>
            <div>{job.state}</div>
            <div>{job.priority}</div>
          </div>

          {/* client */}
          <CustomCollapse title="Cliente">
            <div>
              <div>Cliente</div>
              <div>{job.client.name}</div>
              <div>{job.client.nif}</div>
              <div>{job.client.phone}</div>
            </div>
          </CustomCollapse>
          {/* contact */}
          <CustomCollapse title="Contacto">
            <div>{job.contact.name}</div>
            <div>{job.contact.address}</div>
            <div>{job.contact.phone}</div>
          </CustomCollapse>
          {/* activity */}
          <div>{job.guild.name}</div>
          <div>{job.reference.name}</div>

          <div>
            <JobCaption text="Descripción" component="p" />
            <div className="simple-editor">
              <ViewerEditor text={job.incidentInfo} />
            </div>
          </div>
        </CardContent>
      </Card>
      <ViewerJobNotasSeguimiento />
    </Box>
  )
}
