import { CircularProgress, IconButton } from "@mui/material"
import { pdf } from "@react-pdf/renderer"
import { saveAs } from "file-saver"
import { useState } from "react"

export const DownloadPdfIconButton = ({
  children,
  filename = "",
  color = "primary",
  variant = "outlined",
  IconComponent,
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const doc = children
    const asPdf = pdf([]) // {} is important, throws without an argument
    asPdf.updateContainer(doc)
    const blob = await asPdf.toBlob()
    saveAs(blob, `${filename}.pdf`)
    setLoading(false)
  }

  return (
    <IconButton
      variant={variant}
      color={color}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress color="neutral" size={12} thickness={5} />
      ) : (
        <IconComponent />
      )}
    </IconButton>
  )
}
