import { isGestor } from "./roles"

export const JobStatusEnum = {
  INITIAL: "Pte. ASIGNAR",
  PENDING_VISITED: "Pte. CITA Prof.",
  PENDING_BUDGET: "Esperando Presupuesto",
  BUDGET_VALIDATE: "Pte. Aprobación Presupuesto",
  BUDGET_AUTHORIZED: "En curso",
  DONE: "Terminado",
  BILLING: "Facturado",
  PREFINISH: "Pte. COBRO",
  FINISH: "Cobrado",
  CANCELED: "Anulado",
}

export const jobStatusList = Object.values(JobStatusEnum)

export const getJobStatusByRole = ({ role }) => {
  let status = [
    JobStatusEnum.PENDING_VISITED,
    JobStatusEnum.PENDING_BUDGET,
    JobStatusEnum.BUDGET_VALIDATE,
    JobStatusEnum.BUDGET_AUTHORIZED,
    JobStatusEnum.DONE,
  ]

  if (isGestor({ role })) {
    status = [...status, JobStatusEnum.INITIAL, JobStatusEnum.CANCELED]
  }

  // if (isAutonomo({ role })) {
  //   status = [...status]
  // }

  return status.sort()
}
