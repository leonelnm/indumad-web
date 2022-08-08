import { Button, CircularProgress } from "@mui/material"
import React from "react"

export const LoadingButton = ({
  loading = false,
  text = "",
  type = "submit",
  color = "primary",
  size = "large",
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <Button
      type={type}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
    >
      {loading && (
        <CircularProgress color="secondary" size={26} thickness={5} />
      )}
      {!loading && text}
    </Button>
  )
}
