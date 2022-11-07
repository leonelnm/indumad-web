import { Button, CircularProgress } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { pdf } from "@react-pdf/renderer"
import { saveAs } from "file-saver"
import { useState } from "react"
import toast from "react-hot-toast"
import { messages } from "utils/messages"

export const LazyDownloadPdfButton = ({
  children,
  filename = "",
  text = "Descargar",
  loadingText = "Generando",
  hasDeliveryNote = true,
  color = "primary",
  variant = "outlined",
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (hasDeliveryNote) {
      setLoading(true)
      const doc = children
      const asPdf = pdf([]) // {} is important, throws without an argument
      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()
      saveAs(blob, `${filename}.pdf`)
      setLoading(false)
    } else {
      toast(messages.deliverynote.dontHasDeliveryNote, {
        duration: 6000,
        icon: <InfoIcon sx={{ color: "#664414" }} />,
        style: {
          borderRadius: "10px",
          background: "#fff6ea",
          color: "#664414",
        },
      })
    }
  }

  return (
    <Button
      variant={variant}
      disableElevation={variant !== "outlined"}
      size="small"
      color={color}
      onClick={handleClick}
      disabled={loading}
      endIcon={
        loading ? (
          <CircularProgress color="neutral" size={12} thickness={5} />
        ) : (
          <FileDownloadIcon fontSize="small" />
        )
      }
    >
      {loading ? loadingText : text}
    </Button>
  )
}
