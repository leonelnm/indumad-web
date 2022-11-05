import { number, object, string } from "nope-validator"
import { PriorityType, PriorityTypeAsList } from "./PriorityType"

// Client
const schemaToCreateClient = object().shape({
  nif: string().max(25, "NIF muy largo, debe ser menor a 25 caracteres"),
  name: string()
    .atLeast(3, "Debe tener al menos 3 letras")
    .max(100, "Nombre demasiado largo")
    .required("Nombre es requerido"),
  phone: string()
    .atLeast(5, "Debe tener al menos 5 números")
    .required("Teléfono es requerido"),
})

// Contact
const schemaToCreateContact = object().shape({
  name: string()
    .atLeast(3, "Debe tener al menos 3 letras")
    .max(100, "Nombre demasiado largo")
    .required("Nombre es requerido"),
  address: string()
    .atLeast(3, "Debe tener al menos 4 letras")
    .max(100, "Dirección demasiado largo, máximo 100 caracteres")
    .required("Dirección es requerida"),
  phone: string()
    .atLeast(5, "Debe tener al menos 5 números")
    .required("Teléfono es requerido"),
})

export const schemaToCreateJob = object().shape({
  extReference: string().atMost(50, "Máximo 50 caracteres"),
  priority: string()
    .required("Seleccione prioridad")
    .oneOf(
      PriorityTypeAsList,
      `Valores permitidos ${PriorityTypeAsList.join(",\n")}`
    ),
  iva: number().positive("Debe ser mayor a 0").required("Iva es requerido"),
  client: schemaToCreateClient,
  contact: schemaToCreateContact,
  reference: string().required("Seleccione una Referencia"),
  employee: string(),
})

export const schemaToUpdateJob = object().shape({
  extReference: string().atMost(50, "Máximo 50 caracteres"),
  priority: string()
    .required("Seleccione prioridad")
    .oneOf(
      PriorityTypeAsList,
      `Valores permitidos ${PriorityTypeAsList.join(",\n")}`
    ),
  iva: number().positive("Debe ser mayor a 0").required("Iva es requerido"),
  client: schemaToCreateClient,
  contact: schemaToCreateContact,
})

export const validateIncidentInfo = (
  text = "",
  maxLength = 2000,
  customText = "Información"
) => {
  if (text === "" || text === "<p><br></p>") {
    return { error: true, msg: `${customText} es requerida` }
  }

  if (getStringLengthWithoutHtmlTags(text) > maxLength) {
    return {
      error: true,
      msg: `${customText} muy larga, máximo ${maxLength} caracteres`,
    }
  }

  return { error: false, msg: "OK" }
}

export const getStringLengthWithoutHtmlTags = (text) => {
  const tmp = text.replace(/(<([^>]+)>)/gi, "")
  return tmp.length
}

export const initialValueToCreateJob = {
  extReference: "",
  priority: PriorityType.NORMAL,
  iva: 21,
  client: {
    nif: "",
    name: "",
    phone: "",
  },
  contact: {
    name: "",
    address: "",
    phone: "",
  },
  reference: "",
}

export const getInitialValueToCreateJob = (job) => {
  return {
    extReference: job.extReference ? job.extReference : "",
    priority: job.priority,
    iva: job.iva ? job.iva : 21,
    client: {
      nif: job.client && job.client.nif ? job.client.nif : "",
      name: job.client ? job.client.name : "",
      phone: job.client ? job.client.phone : "",
    },
    contact: {
      name: job.contact ? job.contact.name : "",
      address: job.contact ? job.contact.address : "",
      phone: job.contact ? job.contact.phone : "",
    },
  }
}
