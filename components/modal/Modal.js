import { Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { createPortal } from "react-dom"

export const ModalView = ({
  children,
  handleOpen,
  title,
  show,
  big = false,
}) => {
  return (
    <Box className={`loadingScreen ${show ? "show-element" : "hide-element"}`}>
      <Stack className={`modal ${big ? "big" : ""}`} spacing={2}>
        <Stack>
          <Stack
            flexDirection="row"
            justifyContent={title ? "space-between" : "flex-end"}
          >
            {title && <Typography variant="h5">{title}</Typography>}
            <IconButton variant="text" onClick={() => handleOpen()}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {title && <Divider />}
        </Stack>
        <Stack>{children}</Stack>
      </Stack>
    </Box>
  )
}

export const ModalIndumad = ({
  children,
  handleOpen,
  title,
  show,
  big = false,
}) => {
  return createPortal(
    <ModalView show={show} handleOpen={handleOpen} title={title} big={big}>
      {children}
    </ModalView>,
    document.getElementById("modal-indumad")
  )
}
