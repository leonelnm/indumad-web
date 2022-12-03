import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { IconButton, Stack } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -100%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: "5px",
}

export default function EventModal({ event, open, setOpen }) {
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack justifyContent={"space-between"} flexDirection="row">
            <Typography variant="h6" p={1}>
              {event.title}
            </Typography>
            <IconButton
              aria-label="close event"
              variant="text"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box p={2} pt={1} pb={3}>
            <RowCaption caption={"Fecha"} value={event.date} />
            {event.end && <RowCaption caption={"Fin"} value={event.end} />}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

const RowCaption = ({ caption, value }) => {
  return (
    <Stack flexDirection={"row"} mt={1}>
      <Typography variant="caption" component="i" mr={1} minWidth={"3rem"}>
        {caption}:
      </Typography>
      <Typography mr={1}>{value}</Typography>
    </Stack>
  )
}
