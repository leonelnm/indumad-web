import { nopeResolver } from "@hookform/resolvers/nope"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material"
import { LoadingButton } from "components/ui"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { changePassword } from "services"
import { messages } from "utils/messages"
import { schemaChangePassword } from "utils/validations"

export const ChangePassword = ({ userId }) => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleOnSubmit = async ({ newpassword }) => {
    setLoading(true)
    const { ok } = await changePassword(userId, {
      newpassword,
    })

    if (ok) {
      toast.success(messages.user.password.success)
      reset()
    } else {
      toast.error(messages.user.password.fail)
    }

    setLoading(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: nopeResolver(schemaChangePassword),
  })

  return (
    <Stack
      p={2}
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="newpassword"
        label="Nueva Contraseña"
        margin="none"
        type={showPassword ? "text" : "password"}
        required
        fullWidth
        error={!!errors.newpassword}
        helperText={errors.newpassword?.message}
        {...register("newpassword")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name="confirmpassword"
        label="Confirmar Contraseña"
        margin="none"
        type={showPassword ? "text" : "password"}
        required
        fullWidth
        error={!!errors.confirmpassword}
        helperText={errors.confirmpassword?.message}
        {...register("confirmpassword")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        type="submit"
        color="primary"
        fullWidth
        text="Cambiar contraseña"
        disabled={!isDirty || !isValid}
        loading={loading}
      />
    </Stack>
  )
}
