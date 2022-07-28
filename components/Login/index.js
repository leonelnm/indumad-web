import {
  Alert,
  Box,
  Collapse,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { LoadingButton } from "components/ui"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { MESSAGES } from "utils/messages"
import { useRouter } from "next/router"
import { useAuthContext } from "hooks/context"

export const Login = () => {
  const router = useRouter()
  const { loginUser } = useAuthContext()

  const [error, setError] = useState(false)
  const [msgError, setMsgError] = useState("")
  const [loading, setLoading] = useState(false)

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
      const { ok, status } = await loginUser({ username, password })

      if (ok) {
        setError(false)
        router.replace("/")
      } else {
        setError(true)
        setMsgError(
          status === 500 ? MESSAGES[500] : "Credenciales incorrectas!"
        )
        setTimeout(() => setError(false), 5000)
      }
    } catch (error) {
      console.log("LOGIN Component")
      setError(true)
      setMsgError(MESSAGES[500])
    }
    setLoading(false)
  }

  return (
    <Box
      sx={{
        width: 350,
        padding: "2rem 2rem",
        borderRadius: "5px",
        boxShadow: " -4px 9px 25px -6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" align="center">
              INDUMAD
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Iniciar Sesión
            </Typography>
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Usuario"
              variant="standard"
              autoComplete="off"
              fullWidth
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="standard"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Contraseña es requerido",
                minLength: {
                  value: 6,
                  message: "Debe tener almenos 6 caracteres",
                },
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              color="primary"
              size="large"
              fullWidth
              text="Acceder"
              loading={loading}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
