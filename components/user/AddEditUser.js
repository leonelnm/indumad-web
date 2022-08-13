import { Button, Grid, MenuItem, TextField } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { nopeResolver } from "@hookform/resolvers/nope"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/router"

// custom
import { useAuthContext } from "hooks/context"
import { LoadingButton } from "components/ui"
import { getRolesManagedByRole } from "utils/roles"
import { initialValueToCreateUser, schemaCreateUser } from "utils/validations"
import { indumadClient, indumadRoutes } from "api"
import { cookieNames, getCookie } from "utils/cookies"
import { messages } from "utils/messages"

export const AddEditUser = ({
  edit = false,
  user = undefined,
  isAdmin = false,
}) => {
  // recuperar usuario autenticado
  const { user: userAuth } = useAuthContext()
  const router = useRouter()

  // recuperar los roles que puede administrar
  const roles = getRolesManagedByRole({ role: userAuth.role })

  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false)

  let initialValues = {}
  if (edit && user) {
    initialValues = { ...user }
  } else {
    initialValues = { ...initialValueToCreateUser }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, dirtyFields, isSubmitSuccessful },
  } = useForm({
    mode: edit ? "onChange" : "onBlur",
    defaultValues: initialValues,
    resolver: nopeResolver(schemaCreateUser),
  })

  const onSubmit = async (data) => {
    setLoadingOnSubmit(true)

    // get only dirty fields
    const dataChanged = edit
      ? Object.fromEntries(
          Object.keys(dirtyFields).map((key) => key && [key, data[key]])
        )
      : data

    if (!edit) {
      dataChanged.password = dataChanged.username
    }

    const dataToSend = {
      ...dataChanged,
    }

    try {
      const method = edit ? "put" : "post"
      const url = `${indumadRoutes.user}${user ? `/${user.id}` : ""}`
      const { error } = await indumadClient({
        method,
        url,
        token: getCookie(cookieNames.token),
        body: dataToSend,
      })

      if (error) {
        const msg = edit
          ? messages.user.updated.fail
          : messages.user.created.fail
        toast.error(`${msg}.\n${error.error}!`, {
          duration: 6000,
        })
      } else {
        toast.success(
          edit ? messages.user.updated.sucess : messages.user.created.sucess
        )
      }
    } catch (error) {
      console.log("catch", { error })
      toast.error(
        edit ? messages.user.updated.error : messages.user.created.error
      )
    } finally {
      setLoadingOnSubmit(false)
    }
    setLoadingOnSubmit(false)
  }

  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Grid item sm={6} xs={12}>
          <TextField
            name="username"
            label="Usuario"
            margin="none"
            required
            fullWidth
            inputProps={{ style: { textTransform: "lowercase" } }}
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          {isAdmin && edit && (
            <TextField
              select
              name="active"
              label="Estado"
              required
              fullWidth
              defaultValue={initialValues.active}
              margin="none"
              error={!!errors.active}
              helperText={errors.active?.message}
              {...register("active")}
            >
              <MenuItem value={true}>Activo</MenuItem>
              <MenuItem value={false}>Desactivado</MenuItem>
            </TextField>
          )}
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            name="name"
            label="Nombre"
            required
            fullWidth
            margin="none"
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
            margin="none"
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
            disabled={!isAdmin}
            margin="none"
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
            margin="none"
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
            disabled={!isAdmin}
            defaultValue={initialValues.role}
            margin="none"
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

        <Grid item sm={12} xs={12}>
          <Grid
            container
            component="section"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={7} sm={4} md={3} lg={2}>
              <LoadingButton
                type="submit"
                color="primary"
                size="medium"
                fullWidth
                disabled={edit ? !isDirty : !isDirty || !isValid}
                text={edit ? "Guardar Cambios" : "Crear Usuario"}
                loading={loadingOnSubmit}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                size="medium"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
              >
                {isSubmitSuccessful ? "Regresar" : "Cancelar"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
