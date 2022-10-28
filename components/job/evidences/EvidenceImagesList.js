import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import { DotFlash } from "components/loaders/DotFlash"
import { useAxios } from "hooks/useAxios"
import { useEffect, useState } from "react"
import { indumadRoutes } from "api"
import { messages } from "utils/messages"
import { getDateToShow } from "utils/date"
import toast from "react-hot-toast"

const EvidenceImage = ({ file, deleteFile }) => {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async (id) => {
    setDeleted(true)
    const res = await deleteFile(id)
    if (!res) {
      setDeleted(false)
      toast(`${messages.evidence.delete_fail}`, {
        duration: 6000,
        style: {
          borderRadius: "10px",
          background: "#fff6ea",
          color: "#664414",
        },
      })
    }
  }

  return (
    <Stack className="evidences-box-item-image">
      <img src={file.url} loading="lazy" className={deleted ? "deleted" : ""} />
      {deleted ? (
        <DotFlash absolute={true} />
      ) : (
        <IconButton
          size="small"
          aria-label="delete-evidence"
          onClick={() => handleDelete(file.id)}
        >
          <ClearIcon fontSize="small" sx={{ color: "white" }} />
        </IconButton>
      )}
      <Typography mr={2} variant="caption" textAlign="right">
        {getDateToShow(file.createdAt)}
      </Typography>
    </Stack>
  )
}

export const EvidenceImagesList = ({
  list = [],
  jobId,
  deleteFile = () => {},
  setList = () => {},
}) => {
  const { error, isLoading, data } = useAxios({
    url: `${indumadRoutes.evidences.findAll}/${jobId}`,
  })

  useEffect(() => {
    setList(data || [])
  }, [data])

  if (error) {
    return (
      <Alert severity="warning">
        <AlertTitle>Error</AlertTitle>
        {messages.evidence.error_list}
      </Alert>
    )
  }

  if (isLoading) {
    return <DotFlash />
  }

  return (
    <Box className="evidences-box-images">
      {list.map((file) => (
        <EvidenceImage
          key={`${file.id}-${file.name}`}
          file={file}
          deleteFile={deleteFile}
        />
      ))}
    </Box>
  )
}
