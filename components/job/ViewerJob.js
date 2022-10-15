import { Box } from "@mui/material"
import { CardCollapse } from "components/collapse/CardCollapse"
import { InnerCardCollapse } from "components/collapse/InnerCardCollapse"
import ViewerEditor from "components/editor/ViewerEditor"
import { getDate } from "utils/date"
import { CaptionData } from "./CaptionData"
import { ViewerJobNotasSeguimiento } from "./ViewerJobNotasSeguimiento"

export const ViewerJob = ({ job = {} }) => {
  return (
    <Box pt={1} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <CardCollapse title="Información General" variant="outlined">
        {/* Info */}
        <Box p={1}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <CaptionData title="ID" data={`#${job.id}`} />
            <CaptionData title="Creado" data={getDate(job.createdAt)} />
          </Box>
          <CaptionData title="Ref. Externa" data={job.extReference} />
          <CaptionData title="Nivel" data={job.priority} />
          <CaptionData title="Estado" data={job.state} />

          <CaptionData title="Gremio" data={job.guild.name} />
          <CaptionData title="Actividad/Referencia" data={job.reference.name} />
        </Box>

        {/* client */}
        <InnerCardCollapse title="Cliente">
          <CaptionData title="Nombre" data={job.client.name} />
          <CaptionData title="Nif/CIB" data={job.client.nif} />
          <CaptionData title="Teléfono" data={job.client.phone} />
        </InnerCardCollapse>
        {/* contact */}
        <InnerCardCollapse title="Contacto">
          <CaptionData title="Nombre" data={job.contact.name} />
          <CaptionData title="Dirección" data={job.contact.address} />
          <CaptionData title="Teléfono" data={job.contact.phone} />
        </InnerCardCollapse>
        {/* activity */}
        <InnerCardCollapse
          title="Descripción"
          border={false}
          openOnStart={true}
        >
          <div className="simple-editor">
            <ViewerEditor text={job.incidentInfo} />
          </div>
        </InnerCardCollapse>
      </CardCollapse>
      <ViewerJobNotasSeguimiento jobId={job.id} />
    </Box>
  )
}
