import {
  Alert,
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import GroupWorkIcon from "@mui/icons-material/GroupWork"
import { nopeResolver } from "@hookform/resolvers/nope"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/router"

// custom
import { LoadingButton } from "components/ui"
import { schemaEditProfile } from "utils/validations"
import { indumadClient, indumadRoutes } from "api"
import { messages } from "utils/messages"

export const ProfilePersonalData = ({ user = undefined }) => {
  const router = useRouter()

  // recuperar los roles que puede administrar
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, isSubmitSuccessful },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
    resolver: nopeResolver(schemaEditProfile),
  })

  const onSubmit = async (data) => {
    setLoadingOnSubmit(true)

    // get only dirty fields
    const dataChanged = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => key && [key, data[key]])
    )

    const dataToSend = { ...dataChanged }

    try {
      const url = `${indumadRoutes.user}${user ? `/${user.id}` : ""}`
      const { error } = await indumadClient({
        method: "put",
        url,
        body: dataToSend,
      })

      if (error) {
        const msg = messages.user.updated.fail
        toast.error(`${msg}.\n${error.error}!`, {
          duration: 6000,
        })
      } else {
        toast.success(messages.user.updated.sucess)
      }
    } catch (error) {
      toast.error(messages.user.updated.error)
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
        <Grid item sm={6} xs={12}></Grid>
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
            disabled
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
            name="role"
            label="Rol"
            required
            fullWidth
            disabled
            margin="none"
            error={!!errors.role}
            helperText={errors.role?.message}
            {...register("role")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <Alert variant="outlined" severity="info" icon={<GroupWorkIcon />}>
            <Typography>
              {user && Array.isArray(user.guilds) && user.guilds.length > 0
                ? "Sus Gremios son:"
                : "No tiene gremios asignados"}
            </Typography>
            <List disablePadding>
              {user &&
                Array.isArray(user.guilds) &&
                user.guilds.map((g) => (
                  <ListItem key={g.id}>·{g.name}</ListItem>
                ))}
            </List>
          </Alert>
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
            <Grid item xs={7} sm={4}>
              <LoadingButton
                type="submit"
                color="primary"
                size="medium"
                fullWidth
                disabled={!isDirty}
                text={"Guardar Cambios"}
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
