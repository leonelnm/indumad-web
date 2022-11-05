import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
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
import {
  initialValueToCreateUser,
  schemaCreateUser,
  schemaEditUser,
} from "utils/validations"
import { indumadClient, indumadRoutes } from "api"
import { messages } from "utils/messages"
import { useFetchSwr } from "hooks/useFetchSwr"
import { DotFlash } from "components/loaders/DotFlash"
import { Visibility, VisibilityOff } from "@mui/icons-material"

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

  const [showPassword, setShowPassword] = useState(false)
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false)
  const [guildsSelected, setGuildsSelected] = useState(() =>
    edit ? user.guilds.map((g) => g.id) : []
  )
  const [guildsSelectedChange, setGuildsSelectedChange] = useState(false)

  // Get guilds
  const { isLoading: isLoadingGuilds, data: guilds } = useFetchSwr({
    path: `${indumadRoutes.guild}?status=true`,
  })

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
    reset,
  } = useForm({
    mode: edit ? "onChange" : "onBlur",
    defaultValues: initialValues,
    resolver: nopeResolver(edit ? schemaEditUser : schemaCreateUser),
  })

  const handleChangeGuild = (e) => {
    if (edit) {
      setGuildsSelectedChange(true)
    }
    const value = e.target.value
    const lastItem = [...value].pop()

    if (lastItem === "") {
      setGuildsSelected([])
    } else {
      setGuildsSelected(value === "string" ? value.split(",") : value)
    }
  }

  const onSubmit = async (data) => {
    setLoadingOnSubmit(true)

    // get only dirty fields
    const dataChanged = edit
      ? Object.fromEntries(
          Object.keys(dirtyFields).map((key) => key && [key, data[key]])
        )
      : data

    const dataToSend = {
      ...dataChanged,
    }
    if (edit || guildsSelected.length > 0) {
      dataToSend.guilds = guildsSelected
    }

    try {
      const method = edit ? "put" : "post"
      const url = `${indumadRoutes.user}${user ? `/${user.id}` : ""}`

      const { error } = await indumadClient({
        method,
        url,
        body: dataToSend,
      })

      if (error) {
        const msg = error.translate
          ? error.translate
          : edit
          ? `${messages.user.updated.fail}.\n${error.error}!`
          : `${messages.user.created.fail}.\n${error.error}!`

        toast.error(msg, { duration: 6000 })
      } else {
        toast.success(
          edit ? messages.user.updated.sucess : messages.user.created.sucess
        )

        if (!edit) {
          reset()
          setGuildsSelected([])
        }
      }
    } catch (error) {
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
          {isAdmin && !edit && (
            <TextField
              name="password"
              label="Contraseña"
              margin="none"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
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
          )}

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

        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="name-multipleselect-guild">Gremio</InputLabel>
            {isLoadingGuilds ? (
              <DotFlash />
            ) : (
              <Select
                labelId="name-multipleselect-guild"
                id="select-multipleselect"
                multiple
                value={guildsSelected}
                label="Gremio"
                renderValue={(selected) => {
                  const names = selected.map((slc) =>
                    guilds.filter((t) => t.id === slc)
                  )
                  return names
                    .flat()
                    .map((n) => n.name)
                    .join(", ")
                }}
                onChange={handleChangeGuild}
              >
                <MenuItem value={""} selected>
                  <em>Sin Gremio</em>
                </MenuItem>

                {guilds &&
                  guilds.map((guild) => (
                    <MenuItem key={guild.id} value={guild.id}>
                      <Checkbox
                        checked={guildsSelected.indexOf(guild.id) > -1}
                      />
                      <ListItemText primary={guild.name} />
                    </MenuItem>
                  ))}
              </Select>
            )}
          </FormControl>
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
                disabled={
                  edit
                    ? !isDirty && !guildsSelectedChange
                    : !isDirty || !isValid
                }
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
