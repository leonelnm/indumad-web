import { nopeResolver } from "@hookform/resolvers/nope"
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
} from "@mui/material"
import WarningIcon from "@mui/icons-material/Warning"
import InfoIcon from "@mui/icons-material/Info"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { orange } from "@mui/material/colors"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

// custom
import { LoadingButton } from "components/ui"
import { DotFlash } from "components/loaders/DotFlash"
import Editor from "components/editor/Editor"

import { PriorityTypeAsList } from "utils/PriorityType"
import {
  getStringLengthWithoutHtmlTags,
  initialValueToCreateJob,
  schemaToCreateJob,
  validateIncidentInfo,
} from "utils/validationJob"
import { useFetchSwr } from "hooks/useFetchSwr"
import { indumadClient, indumadRoutes } from "api"

import { messages } from "utils/messages"
import { CustomToastLink } from "components/ui/toast/CustomToastLink"
import { findByGuild } from "services/userService"

export const CreateJobForm = () => {
  const router = useRouter()

  // incidente info
  const [incidentInfo, setIncidentInfo] = useState("")
  const [counter, setCounter] = useState(0)
  const [errorInfo, setErrorInfo] = useState({ error: false, msg: "" })

  // select guild
  const [guild, setGuild] = useState("")
  const [errorGuild, setErrorGuild] = useState(false)

  // select employees
  const [employees, setEmployees] = useState([])
  const [searchingEmployees, setSearchingEmployees] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: initialValueToCreateJob,
    resolver: nopeResolver(schemaToCreateJob),
  })

  // Get guilds
  const { isLoading: isLoadingGuilds, data: guilds } = useFetchSwr({
    path: `${indumadRoutes.guild}?status=true`,
  })

  // Get references
  const { isLoading: isLoadingReferences, data: references } = useFetchSwr({
    path: `${indumadRoutes.reference}?status=true`,
  })

  const isIncidentInfoError = (data) => {
    const { error, msg } = validateIncidentInfo(data)
    setErrorInfo({ error, msg })
    return error
  }

  const onChangeIncidentInfo = (data) => {
    setIncidentInfo(data)
    setCounter(getStringLengthWithoutHtmlTags(data))
    isIncidentInfoError(data)
  }

  const handlerReset = () => {
    reset()
    setIncidentInfo(">")
    setGuild("")
    setErrorGuild(false)
  }

  const handleSelectGuild = async (event) => {
    const value = event.target.value
    setGuild(value)
    setErrorGuild(value === "")

    if (value !== "") {
      setSearchingEmployees(true)
      try {
        const { error, data } = await findByGuild({
          guild: value,
        })

        if (error) {
          toast("TExt", {
            icon: <WarningIcon color="secondary" />,
          })
        } else {
          setEmployees(data)

          if (data.length === 0) {
            toast("No hay trabajadores para el Gremio seleccionado", {
              icon: <InfoIcon sx={{ color: orange[800] }} />,
              duration: 4000,
            })
          }
        }
      } catch (error) {
        console.log("Catch ON handleSelectGuild", error)
      } finally {
        setSearchingEmployees(false)
      }
    }
  }

  const onSubmit = async (data) => {
    if (isIncidentInfoError(incidentInfo)) {
      return
    }
    if (guild === "") {
      setErrorGuild(true)
      return
    }

    // Create JOB
    try {
      data.guild = guild
      data.incidentInfo = incidentInfo

      const { error, data: jobCreated } = await indumadClient({
        method: "post",
        url: indumadRoutes.job,
        body: data,
      })

      if (error) {
        const msg = messages.job.created.error
        toast.error(`${msg}.\n${error.msg}!`, { duration: 6000 })
      } else {
        const id = jobCreated.id
        const msg = `${messages.job.created.sucess}\nNuevo trabajo: `
        toast.success(
          <CustomToastLink text={msg} url={`/job/${id}`} urlname={id} />,
          {
            duration: 5000,
          }
        )

        handlerReset()
      }
    } catch (error) {
      toast.error(messages.job.created.fail, { duration: 6000 })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="outlined" color="secondary" onClick={() => reset()}>
            Limpiar <DeleteSweepOutlinedIcon />
          </Button>
        </Grid> */}

        <Grid item xs={12} component="section">
          <Paper elevation={1} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">Detalle</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      size="small"
                      name="extReference"
                      label="Referenci Ext."
                      margin="none"
                      autoComplete="off"
                      fullWidth
                      error={!!errors.extReference}
                      helperText={errors.extReference?.message}
                      {...register("extReference")}
                    />
                  </Grid>
                  <Grid item xs={7} sm={5}>
                    <TextField
                      size="small"
                      select
                      name="priority"
                      label="Prioridad"
                      autoComplete="off"
                      margin="none"
                      required
                      fullWidth
                      defaultValue={initialValueToCreateJob.priority}
                      error={!!errors.priority}
                      helperText={errors.priority?.message}
                      {...register("priority")}
                    >
                      {PriorityTypeAsList.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                          {priority}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={5} sm={3}>
                    <TextField
                      size="small"
                      name="iva"
                      label="IVA"
                      margin="none"
                      type="number"
                      autoComplete="off"
                      fullWidth
                      required
                      error={!!errors.iva}
                      helperText={errors.iva?.message}
                      {...register("iva")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      size="small"
                      select
                      name="reference"
                      label="Referencia"
                      margin="none"
                      autoComplete="off"
                      required
                      fullWidth
                      defaultValue={initialValueToCreateJob.reference}
                      error={!!errors.reference}
                      helperText={errors.reference?.message}
                      {...register("reference")}
                    >
                      <MenuItem value={""} selected>
                        <em>Seleccionar</em>
                      </MenuItem>

                      {isLoadingReferences && (
                        <MenuItem>
                          <DotFlash />
                        </MenuItem>
                      )}
                      {references &&
                        references.map((reference) => (
                          <MenuItem key={reference.id} value={reference.id}>
                            {reference.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={errorGuild}>
                      <InputLabel id="name-select-guild">Gremio *</InputLabel>
                      <Select
                        labelId="name-select-guild"
                        id="select-guild"
                        value={guild}
                        label="Gremio *"
                        onChange={handleSelectGuild}
                      >
                        <MenuItem value={""} selected>
                          <em>Seleccionar</em>
                        </MenuItem>
                        {isLoadingGuilds && (
                          <MenuItem>
                            <DotFlash />
                          </MenuItem>
                        )}

                        {guilds &&
                          guilds.map((guild) => (
                            <MenuItem key={guild.id} value={guild.id}>
                              {guild.name}
                            </MenuItem>
                          ))}
                      </Select>
                      {errorGuild && (
                        <FormHelperText>Seleccione un Gremio</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {guild !== "" && employees.length > 0 && (
                    <Grid item xs={12} sm={4}>
                      <TextField
                        size="small"
                        select
                        defaultValue={""}
                        name="employee"
                        label="Asignar a"
                        margin="none"
                        autoComplete="off"
                        fullWidth
                        {...register("employee")}
                      >
                        <MenuItem value={""} selected>
                          <em>Sin Asignar</em>
                        </MenuItem>

                        {searchingEmployees && (
                          <MenuItem>
                            <DotFlash />
                          </MenuItem>
                        )}
                        {employees.length > 0 &&
                          employees.map((employe) => (
                            <MenuItem key={employe.id} value={employe.id}>
                              {employe.fullname}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      color={errorInfo.error ? "error" : ""}
                    >
                      Descripción incidencia *
                    </Typography>
                    <Editor
                      setText={onChangeIncidentInfo}
                      text={incidentInfo}
                      validation={errorInfo}
                      placeholder="Inserte información del incidente/siniestro"
                    />
                    {counter > 1900 && (
                      <Typography
                        pl={2}
                        mr={2}
                        variant="caption"
                        color={counter > 2000 ? "error" : ""}
                      >
                        {counter}/2000
                      </Typography>
                    )}
                    {errorInfo.error && (
                      <Typography variant="caption" color="error" pl={2}>
                        {errorInfo.msg}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Client */}
        <Grid item xs={12} component="section">
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" p={1}>
              Cliente *
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="client.name"
                  label="Nombre"
                  margin="none"
                  autoComplete="off"
                  fullWidth
                  required
                  error={!!errors.client?.name}
                  helperText={errors.client?.name?.message}
                  {...register("client.name")}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  name="client.nif"
                  label="NIF / DNI"
                  margin="none"
                  autoComplete="off"
                  fullWidth
                  error={!!errors.client?.nif}
                  helperText={errors.client?.nif?.message}
                  {...register("client.nif")}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  name="client.phone"
                  required
                  label="Teléfono"
                  margin="none"
                  autoComplete="off"
                  fullWidth
                  error={!!errors.client?.phone}
                  helperText={errors.client?.phone?.message}
                  {...register("client.phone")}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} component="section">
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" p={1}>
              Contacto *
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  name="contact.name"
                  label="Nombre"
                  margin="none"
                  autoComplete="off"
                  fullWidth
                  required
                  error={!!errors.contact?.name}
                  helperText={errors.contact?.name?.message}
                  {...register("contact.name")}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  name="contact.phone"
                  label="Teléfono"
                  margin="none"
                  autoComplete="off"
                  fullWidth
                  required
                  error={!!errors.contact?.phone}
                  helperText={errors.contact?.phone?.message}
                  {...register("contact.phone")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="contact.address"
                  label="Dirección"
                  margin="none"
                  autoComplete="off"
                  fullWidth
                  required
                  error={!!errors.contact?.address}
                  helperText={errors.contact?.address?.message}
                  {...register("contact.address")}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={2}>
        <LoadingButton
          type="submit"
          color="primary"
          size="medium"
          disabled={!isDirty || !isValid || errorInfo.error}
          text={"Crear Trabajo"}
          loading={isSubmitting}
        />
        <Button
          sx={{ ml: 2 }}
          color="neutral"
          variant="outlined"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
