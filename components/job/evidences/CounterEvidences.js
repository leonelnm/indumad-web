import { Alert, Stack, Typography } from "@mui/material"
import React from "react"
import { messages } from "utils/messages"

export const CounterEvidences = ({ currentLength = 0, maxLength = 0 }) => {
  const hasMaxEvidences = currentLength >= maxLength

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
      alignItems="center"
    >
      {hasMaxEvidences && (
        <Alert severity="info" sx={{ flexGrow: 1 }}>
          {messages.evidence.full}
        </Alert>
      )}
      <Typography variant="body2" textAlign="center">
        Entregadas: {currentLength}
      </Typography>
    </Stack>
  )
}
