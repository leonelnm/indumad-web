import { number, object, ref, string } from "nope-validator"
import { RoleEnumType, RoleEnumTypeAsSimpleList } from "./roles"

export const schemaCreateUser = object().shape({
  username: string()
    .required("Usuario es requerido")
    .atLeast(5, "Debe tener al menos 5 caracteres")
    .atMost(10, "Usuario es muy largo, máximo 10 caracteres"),
  password: string()
    .required("Contraseña es requerida")
    .atLeast(6, "Debe tener al menos 6 caracteres")
    .regex(
      /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z[0-9]{6,}$/i,
      "La contraseña debe llevar al menos una letra y un número"
    ),
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

export const schemaEditUser = object().shape({
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

export const schemaEditProfile = object().shape({
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
  phone: number("No válido")
    .required("Teléfono es requerido")
    .positive("No válido")
    .min(10000, "Teléfono no válido")
    .max(1000000000, "Teléfono no válido"),
})

export const schemaChangePassword = object().shape({
  newpassword: string()
    .required("Nueva contraseña es requerida")
    .atLeast(6, "Debe tener al menos 6 caracteres")
    .regex(
      /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z[0-9]{6,}$/i,
      "La contraseña debe llevar al menos una letra y un número"
    ),
  confirmpassword: string()
    .required("Vuelva a insertar la contraseña")
    .oneOf([ref("newpassword")], "No coinciden las contraseñas"),
})

export const initialValueToCreateUser = {
  username: "",
  name: "",
  dni: "",
  lastname: "",
  phone: "",
  role: RoleEnumType.AUTONOMO,
}
