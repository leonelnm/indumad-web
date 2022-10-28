import Compressor from "compressorjs"
import toast from "react-hot-toast"
import { Button, Stack } from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { messages } from "utils/messages"

function compress(file) {
  return new Promise((resolve, reject) => {
    return new Compressor(file, {
      quality: 0.6,
      success(result) {
        resolve(result)
      },
      error(e) {
        reject(e)
      },
    })
  })
}

export const AddEvidence = ({
  addFiles = () => {},
  maxLength = 0,
  currentLength = 0,
  uploading = false,
}) => {
  const hasMaxEvidences = currentLength >= maxLength

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const fileCompressed = await compress(file)

    if (currentLength + 1 > maxLength) {
      toast(`${messages.evidence.max} (${maxLength})`, {
        duration: 6000,
        style: {
          borderRadius: "10px",
          background: "#fff6ea",
          color: "#664414",
        },
      })
      return
    }

    addFiles({
      name: file.name,
      url: URL.createObjectURL(fileCompressed),
      id: Date.now(),
      file: fileCompressed,
    })
  }

  return (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        fullWidth
        component="label"
        color="secondary"
        disabled={hasMaxEvidences || uploading}
        endIcon={<AddPhotoAlternateIcon />}
      >
        Agregar Evidencias
        <input
          hidden
          accept="image/*"
          name="evidence"
          type="file"
          onChange={handleUpload}
        />
      </Button>
    </Stack>
  )
}
