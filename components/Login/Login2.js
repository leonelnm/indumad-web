import {
  Alert,
  Avatar,
  Box,
  Collapse,
  TextField,
  Typography,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { LoadingButton } from "components/ui"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { useState } from "react"

import { messages } from "utils/messages"
import { useAuthContext } from "hooks/context"
import { Copyright } from "components/Copyright"

export const Login2 = () => {
  const router = useRouter()
  const { loginUser } = useAuthContext()

  const [error, setError] = useState(false)
  const [msgError, setMsgError] = useState("")
  const [loading, setLoading] = useState(false)

  const destination = router.query.from?.toString() || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async ({ username, password }) => {
    setLoading(true)
    try {
      const { ok, status } = await loginUser({
        username: username.toLowerCase(),
        password,
      })

      if (ok) {
        setError(false)
        router.replace(destination)
      } else {
        setError(true)
        setMsgError(
          status === 500 ? messages[500] : "Credenciales incorrectas!"
        )
        setTimeout(() => setError(false), 5000)
      }
    } catch (error) {
      setError(true)
      setMsgError(messages[500])
    }
    setLoading(false)
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: 8,
          paddingRight: 2,
          paddingLeft: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Collapse in={error}>
            <Alert
              severity="error"
              onClose={() => {
                setError(false)
              }}
            >
              {msgError}
            </Alert>
          </Collapse>{" "}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Usuario"
            autoComplete="username"
            autoFocus
            inputProps={{ style: { textTransform: "lowercase" } }}
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username", {
              required: "Usuario es requerido",
              minLength: {
                value: 4,
                message: "Debe tener almenos 4 caracteres",
              },
            })}
          />
          <TextField
            margin="normal"
            label="Contraseña"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Contraseña es requerido",
              minLength: {
                value: 4,
                message: "Debe tener almenos 4 caracteres",
              },
            })}
          />
          <LoadingButton
            type="submit"
            color="primary"
            size="large"
            fullWidth
            text="Acceder"
            loading={loading}
          />
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  )
}
