import { Button, Divider, Stack } from "@mui/material"

export const AddBudgetNoteButton = ({ handlerOpenModal, state }) => {
  return (
    <>
      <Stack p={1} flexDirection="row" justifyContent="left">
        <Button
          color="secondary"
          onClick={handlerOpenModal}
          disabled={state.showModal}
        >
          Enviar Presupuesto
        </Button>
      </Stack>
      <Divider />
    </>
  )
}
