import { CardCollapse } from "components/collapse/CardCollapse"
import { ViewEvidences } from "./evidences/ViewEvidences"

export const ViewerJobEvidences = ({ jobId = "" }) => {
  return (
    <CardCollapse title="Evidencias" openOnStart={false}>
      <ViewEvidences jobId={jobId} />
    </CardCollapse>
  )
}
