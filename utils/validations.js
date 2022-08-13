import { number, object, string } from "nope-validator"
import { RoleEnumType, RoleEnumTypeAsSimpleList } from "./roles"

export const schemaCreateUser = object().shape({
  username: string()
    .required("Usuario es requerido")
    .atLeast(5, "Debe tener al menos 5 caracteres")
    .atMost(10, "Usuario es muy largo, máximo 10 caracteres"),
  name: string()
    .required("Nombre es requerido")
    .atLeast(2, "Debe tener al menos 2 caracteres")
    .atMost(30, "Usuario es muy largo, máximo 30 caracteres"),
  lastname: string()
    .required("Apellido es requerido")
    .atLeast(2, "Debe tener al menos 2 caracteres")
    .atMost(50, "Usuario es muy largo, máximo 50 caracteres"),
  dni: string().between(5, 10, "No es válido").required("DNI es requerido"),
  phone: number("No válido")
    .required("Teléfono es requerido")
    .positive("No válido")
    .min(10000, "Teléfono no válido")
    .max(1000000000, "Teléfono no válido"),
  role: string()
    .required("Seleccione un rol")
    .oneOf(
      RoleEnumTypeAsSimpleList,
      `Valores permitidos ${RoleEnumTypeAsSimpleList.join(",\n")}`
    ),
})

export const initialValueToCreateUser = {
  username: "",
  name: "",
  dni: "",
  lastname: "",
  phone: "",
  role: RoleEnumType.AUTONOMO,
}
