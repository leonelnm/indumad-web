import { CardCollapse } from "components/collapse/CardCollapse"
import { ViewNotasSeguimiento } from "./followUpNotes/ViewNotasSeguimiento"

export const ViewerJobNotasSeguimiento = ({ jobId = "" }) => {
  return (
    <CardCollapse title="Notas de Seguimiento">
      <ViewNotasSeguimiento jobId={jobId} />
    </CardCollapse>
  )
}
