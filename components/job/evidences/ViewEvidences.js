import { Stack } from "@mui/material"
import { DotFlash } from "components/loaders/DotFlash"
import { useState } from "react"
import toast from "react-hot-toast"
import { deleteEvidence, uploadImage } from "services"
import { messages } from "utils/messages"
import { AddEvidence } from "./AddEvidence"
import { CounterEvidences } from "./CounterEvidences"
import { EvidenceImagesList } from "./EvidenceImagesList"

const MAXLENGTH = process.env.NEXT_PUBLIC_MAX_EVIDENCES

export const ViewEvidences = ({ jobId }) => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleAddFiles = async (fileToAdd) => {
    setUploading(true)

    const formData = new FormData()
    formData.append("evidence", fileToAdd.file)

    const { ok, data } = await uploadImage({ jobId, data: formData })
    if (ok) {
      setFiles([data, ...files])
    } else {
      toast.error(`${messages.evidence.created.fail}`, {
        duration: 6000,
        style: {
          borderRadius: "10px",
          background: "#fff6ea",
          color: "#664414",
        },
      })
    }

    setUploading(false)
  }

  const handleDeleteFile = async (id) => {
    // const filesTmp = [...files]
    const { ok } = await deleteEvidence({ id })
    if (ok) {
      setFiles((fs) => fs.filter((f) => f.id !== id))
    }
    return ok
  }

  // Busca todas las images por jobId

  return (
    <Stack spacing={2} mt={2} mb={5} ml={2} mr={2} alignItems="stretch">
      <CounterEvidences currentLength={files.length} maxLength={MAXLENGTH} />
      <AddEvidence
        addFiles={handleAddFiles}
        currentLength={files.length}
        maxLength={MAXLENGTH}
        uploading={uploading}
      />
      {uploading && <DotFlash />}
      <EvidenceImagesList
        jobId={jobId}
        list={files}
        setList={setFiles}
        deleteFile={handleDeleteFile}
      />
    </Stack>
  )
}
