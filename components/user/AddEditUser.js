import { Button, Grid, MenuItem, TextField } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { nopeResolver } from "@hookform/resolvers/nope"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useState } from "react"
import Link from "next/link"

// custom
import { useAuthContext } from "hooks/context"
import { LoadingButton } from "components/ui"
import { getRolesManagedByRole } from "utils/roles"
import { initialValueToCreateUser, schemaCreateUser } from "utils/validations"
import { indumadClient, indumadRoutes } from "api"
import { cookieNames, getCookie } from "utils/cookies"
import { messages } from "utils/messages"

export const AddEditUser = () => {
  // recuperar usuario autenticado
  const { user: userAuth } = useAuthContext()

  // recuperar los roles que puede administrar
  const roles = getRolesManagedByRole({ role: userAuth.role })

  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: initialValueToCreateUser,
    resolver: nopeResolver(schemaCreateUser),
  })

  const onSubmit = async (data) => {
    setLoadingOnSubmit(true)
    const dataToSend = {
      ...data,
      password: data.username,
    }

    console.log({ dataToSend })

    try {
      const { error } = await indumadClient({
        method: "post",
        url: `${indumadRoutes.user}`,
        token: getCookie(cookieNames.token),
        body: dataToSend,
      })

      if (error) {
        toast.error(`${messages.user.created_fail}.\n${error.error}!`, {
          duration: 6000,
        })
      } else {
        toast.success(messages.user.created_success)
      }
    } catch (error) {
      console.log("catch", { error })
      toast.error(messages.user.created_error)
    } finally {
      setLoadingOnSubmit(false)
    }
    setLoadingOnSubmit(false)
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Grid item sm={6} xs={12}>
          <TextField
            name="username"
            label="Usuario"
            margin="normal"
            required
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
          />
        </Grid>
        <Grid item sm={6} display={{ xs: "none", sm: "block" }}>
          {/* <TextField
            select
            name="active"
            label="Estado"
            required
            fullWidth
            defaultValue={initialValueToCreateUser.active}
            margin="normal"
            error={!!errors.active}
            helperText={errors.active?.message}
            {...register("active")}
          >
            <MenuItem value={true}>Activo</MenuItem>
            <MenuItem value={false}>Desactivado</MenuItem>
          </TextField> */}
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            name="name"
            label="Nombre"
            required
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="lastname"
            label="Apellidos"
            required
            fullWidth
            margin="normal"
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            {...register("lastname")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="dni"
            label="DNI"
            required
            fullWidth
            margin="normal"
            error={!!errors.dni}
            helperText={errors.dni?.message}
            {...register("dni")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="phone"
            label="Teléfono"
            required
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register("phone")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            select
            name="role"
            label="Rol"
            required
            fullWidth
            defaultValue={initialValueToCreateUser.role}
            margin="normal"
            error={!!errors.role}
            helperText={errors.role?.message}
            {...register("role")}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={12} xs></Grid>

        <Grid item sm={4} xs={12}>
          <LoadingButton
            type="submit"
            color="success"
            size="large"
            fullWidth
            disabled={!isDirty || !isValid}
            text="Crear Usuario"
            loading={loadingOnSubmit}
          />
        </Grid>

        <Grid item xs></Grid>

        <Grid item sm={4} xs={12}>
          <Link href={"/admin/users"} passHref>
            <Button
              variant="outlined"
              component="a"
              color="secondary"
              size="large"
              fullWidth
              startIcon={<ArrowBackIcon />}
            >
              Cancelar
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}
