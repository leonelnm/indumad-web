export const RoleEnumType = {
  AUTONOMO: "AUTONOMO",
  CONTRATADO: "CONTRATADO",
  GESTOR: "GESTOR",
  ADMINISTRADOR: "ADMINISTRADOR",
  SUPERADMIN: "SUPERADMIN", // exclusivo para funciones especiales (sabe lo q hace)
}

export const RoleEnumTypeAsSimpleList = Object.values(RoleEnumType)

const authorizedRoles = {
  administrador: [RoleEnumType.ADMINISTRADOR, RoleEnumType.SUPERADMIN],
  autonomo: [
    RoleEnumType.AUTONOMO,
    RoleEnumType.ADMINISTRADOR,
    RoleEnumType.SUPERADMIN,
  ],
  contratado: [
    RoleEnumType.CONTRATADO,
    RoleEnumType.ADMINISTRADOR,
    RoleEnumType.SUPERADMIN,
  ],
  gestor: [
    RoleEnumType.GESTOR,
    RoleEnumType.ADMINISTRADOR,
    RoleEnumType.SUPERADMIN,
  ],
  superAdmin: [RoleEnumType.SUPERADMIN],
}

export const isSuperAdmin = ({ role = "" }) => {
  return validateRole({
    userRole: role,
    authorizedRoles: authorizedRoles.superAdmin,
  })
}

export const isAdministrador = ({ role = "" }) => {
  return validateRole({
    userRole: role,
    authorizedRoles: authorizedRoles.administrador,
  })
}

export const isGestor = ({ role = "" }) => {
  return validateRole({
    userRole: role,
    authorizedRoles: authorizedRoles.gestor,
  })
}

export const isAutonomo = ({ role = "" }) => {
  return validateRole({
    userRole: role,
    authorizedRoles: authorizedRoles.autonomo,
  })
}

export const isContratado = ({ role = "" }) => {
  return validateRole({
    userRole: role,
    authorizedRoles: authorizedRoles.contratado,
  })
}

const validateRole = ({ userRole = "", authorizedRoles = [] }) => {
  if (!userRole) {
    return false
  }

  return authorizedRoles.includes(userRole)
}

export const getRolesManagedByRole = ({ role = "" }) => {
  if (isSuperAdmin({ role })) {
    return [
      RoleEnumType.ADMINISTRADOR,
      RoleEnumType.AUTONOMO,
      RoleEnumType.CONTRATADO,
      RoleEnumType.GESTOR,
      RoleEnumType.SUPERADMIN,
    ]
  }

  if (isAdministrador({ role })) {
    return [
      RoleEnumType.ADMINISTRADOR,
      RoleEnumType.AUTONOMO,
      RoleEnumType.CONTRATADO,
      RoleEnumType.GESTOR,
    ]
  }

  if (isGestor({ role })) {
    return [RoleEnumType.AUTONOMO, RoleEnumType.CONTRATADO, RoleEnumType.GESTOR]
  }

  return []
}
