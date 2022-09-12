import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material"
import toast from "react-hot-toast"
import { useState } from "react"
import { useForm } from "react-hook-form"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import CancelIcon from "@mui/icons-material/Cancel"

import { indumadClient, indumadRoutes } from "api"
import { LoadingButton } from "components/ui"
import { messages } from "utils/messages"

export const EasyItemAddEdit = ({
  handlerSubmit = () => {},
  validate = () => {},
  handleEdit = () => {},
  edit = false,
  value = "",
  isGuild = true,
}) => {
  // select message source
  let msg = isGuild ? messages.guild : messages.reference
  msg = edit ? msg.updated : msg.created
  const title = isGuild ? "Gremio" : "Referencia"

  // select path to submit
  const path = isGuild ? indumadRoutes.guild : indumadRoutes.reference

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: value,
    },
  })

  const onSubmitForm = async (data) => {
    setLoading(true)

    const dataToSend = {
      name: data.name.toUpperCase(),
    }

    try {
      const method = edit ? "put" : "post"
      const url = edit ? `${path}/${value}` : path
      const { error } = await indumadClient({
        method,
        url,
        body: dataToSend,
      })

      if (!error) {
        toast.success(msg.sucess)
        if (edit) {
          handlerSubmit(value, dataToSend)
        } else {
          reset()
          handlerSubmit(dataToSend)
        }
      } else {
        toast.error(`${msg.fail}.\n${error?.msg}!`, {
          duration: 6000,
        })
      }

      if (edit) {
        handleEdit(false)
      }
    } catch (error) {
      toast.error(`${msg.error}`, {
        duration: 6000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
        sx={{ display: "inline-flex" }}
      >
        <TextField
          margin="none"
          required
          label={edit ? "" : title}
          autoComplete="off"
          size="small"
          autoFocus={edit}
          inputProps={{ style: { textTransform: "uppercase" } }}
          error={!!errors.name}
          sx={{
            flexGrow: 1,
            "& fieldset": {
              borderRadius: "4px 0 0 4px",
            },
          }}
          {...register("name", {
            required: `${title} no puede ser vacío`,
            minLength: {
              value: 3,
              message: "Debe tener almenos 3 letras",
            },
            maxLength: {
              value: 25,
              message: "No debe tener más de 25 caracteres",
            },
            validate: {
              unique: (v) =>
                validate(v.toLocaleUpperCase()) || `${title} ya existe"`,
            },
          })}
        />

        {edit ? (
          <>
            <Button
              type="submit"
              color="success"
              variant="outlined"
              aria-label={`edit ${value}`}
              sx={{ flexGrow: 0 }}
              disabled={!isDirty || !isValid || loading}
            >
              {loading ? (
                <CircularProgress color="secondary" size={26} thickness={5} />
              ) : (
                <DoneAllIcon />
              )}
            </Button>
            <Button
              color="neutral"
              variant="outlined"
              aria-label={`cancel ${value}`}
              sx={{ flexGrow: 0 }}
              onClick={() => handleEdit(false)}
              disabled={loading}
            >
              <CancelIcon />
            </Button>
          </>
        ) : (
          <LoadingButton
            type="submit"
            color="primary"
            size="middle"
            text="Añadir"
            // variant="outlined"
            loading={loading}
            disabled={!isDirty || !isValid}
            disableElevation={true}
            sx={{ borderRadius: "0 4px 4px 0", minWidth: "5rem" }}
          />
        )}
      </Box>
      {!!errors.name && (
        <Typography variant="caption" pl={1} color="error">
          {errors.name?.message}
        </Typography>
      )}
    </>
  )
}
