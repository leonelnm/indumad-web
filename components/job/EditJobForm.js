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

// custom
import { LoadingButton } from "components/ui"
import { DotFlash } from "components/loaders/DotFlash"
import Editor from "components/editor/Editor"

import { PriorityTypeAsList } from "utils/PriorityType"
import {
  getInitialValueToCreateJob,
  getStringLengthWithoutHtmlTags,
  schemaToUpdateJob,
  validateIncidentInfo,
} from "utils/validationJob"
import { useRouter } from "next/router"
import { useFetchSwr } from "hooks/useFetchSwr"
import { indumadClient, indumadRoutes } from "api"

import { messages } from "utils/messages"
import { findByGuild } from "services/userService"
import { useAxios } from "hooks/useAxios"

export const EditJobForm = ({ job = {} }) => {
  const router = useRouter()

  // incidente info
  const [incidentInfo, setIncidentInfo] = useState(job.incidentInfo)
  const [counter, setCounter] = useState(
    getStringLengthWithoutHtmlTags(job.incidentInfo)
  )
  const [errorInfo, setErrorInfo] = useState({ error: false, msg: "" })

  // select guild
  const [guild, setGuild] = useState(job.guild.id)
  const [errorGuild, setErrorGuild] = useState(false)

  // select reference
  const [reference, setReference] = useState(job.reference.id)
  const [errorReference, setErrorReference] = useState(false)

  const [employee, setEmployee] = useState(job.employee ? job.employee.id : "")

  const [changes, setChanges] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: getInitialValueToCreateJob(job),
    resolver: nopeResolver(schemaToUpdateJob),
  })

  // Get guilds
  const { isLoading: isLoadingGuilds, data: guilds } = useFetchSwr({
    path: `${indumadRoutes.guild}?status=true`,
  })

  // Get references
  const { isLoading: isLoadingReferences, data: references } = useFetchSwr({
    path: `${indumadRoutes.reference}?status=true`,
  })

  // Get employees
  const {
    isLoading: searchingEmployees,
    setIsLoading: setSearchingEmployees,
    data: employees,
    setData: setEmployees,
  } = useAxios({
    url: `${indumadRoutes.user}/guild/${guild}`,
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
    setChanges(true)
  }

  const handleSelectGuild = async (event) => {
    const value = event.target.value
    setGuild(value)
    setErrorGuild(value === "")
    setChanges(true)

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
          setEmployee("")
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

  const handleSelectReference = async (event) => {
    const value = event.target.value
    setReference(value)
    setErrorReference(value === "")
    setChanges(true)
  }

  const onSubmit = async (data) => {
    if (isIncidentInfoError(incidentInfo)) {
      return
    }
    if (guild === "") {
      setErrorGuild(true)
      return
    }

    if (reference === "") {
      setErrorReference(true)
      return
    }

    if (employee !== "") {
      data.employee = employee
    }
    console.log(data)
    // Update JOB
    try {
      data.guild = guild
      data.reference = reference
      data.incidentInfo = incidentInfo
      const { error } = await indumadClient({
        method: "put",
        url: `${indumadRoutes.job}/${job.id}`,
        body: data,
      })

      if (error) {
        const msg = messages.job.updated.error
        toast.error(`${msg}.\n${error.msg}!`, { duration: 6000 })
      } else {
        toast.success(`${messages.job.updated.sucess}`, {
          duration: 5000,
        })
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
                      defaultValue={job.priority}
                      error={!!errors.priority}
                      helperText={errors.priority?.message}
                      {...register("priority")}
                    >
                      {PriorityTypeAsList.sort().map((priority) => (
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
                    <FormControl fullWidth size="small" error={errorReference}>
                      <InputLabel id="name-select-reference">
                        Referencia *
                      </InputLabel>
                      <Select
                        labelId="name-select-reference"
                        id="select-reference"
                        value={isLoadingReferences ? "" : reference}
                        label="Referencia *"
                        onChange={handleSelectReference}
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
                      </Select>
                      {errorReference && (
                        <FormHelperText>
                          Seleccione una Referencia
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={errorGuild}>
                      <InputLabel id="name-select-guild">Gremio *</InputLabel>
                      <Select
                        labelId="name-select-guild"
                        id="select-guild"
                        value={isLoadingGuilds ? "" : guild}
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
                  {guild !== "" && employees && employees.length > 0 && (
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="name-select-employee">
                          Asignar a
                        </InputLabel>
                        <Select
                          labelId="name-select-employee"
                          id="select-employee"
                          value={employee}
                          label="Asignar a"
                          onChange={(e) => setEmployee(e.target.value)}
                        >
                          <MenuItem value={""} selected>
                            <em>Sin Asignar</em>
                          </MenuItem>

                          {searchingEmployees && (
                            <MenuItem>
                              <DotFlash />
                            </MenuItem>
                          )}
                          {employees.map((employe) => (
                            <MenuItem key={employe.id} value={employe.id}>
                              {employe.fullname
                                ? employe.fullname
                                : `${employe.name} ${employe.lastname} (${employe.dni})`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
          disabled={
            changes ? !changes : !isDirty || !isValid || errorInfo.error
          }
          text={"Guardar Cambios"}
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
