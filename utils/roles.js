export const RoleEnumType = {
  AUTONOMO: "AUTONOMO",
  CONTRATADO: "CONTRATADO",
  GESTOR: "GESTOR",
  ADMINISTRADOR: "ADMINISTRADOR",
  SUPERADMIN: "SUPERADMIN", // exclusivo para funciones especiales (sabe lo q hace)
}

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

export const isSuperAdmin = ({ roles = [] }) => {
  return validateRole({
    userRoles: roles,
    authorizedRoles: authorizedRoles.superAdmin,
  })
}

export const isAdministrador = ({ roles = [] }) => {
  return validateRole({
    userRoles: roles,
    authorizedRoles: authorizedRoles.administrador,
  })
}

export const isGestor = ({ roles = [] }) => {
  return validateRole({
    userRoles: roles,
    authorizedRoles: authorizedRoles.gestor,
  })
}

export const isAutonomo = ({ roles = [] }) => {
  return validateRole({
    userRoles: roles,
    authorizedRoles: authorizedRoles.autonomo,
  })
}

export const isContratado = ({ roles = [] }) => {
  return validateRole({
    userRoles: roles,
    authorizedRoles: authorizedRoles.contratado,
  })
}

const validateRole = ({ userRoles = [], authorizedRoles = [] }) => {
  let authorized = false
  if (!userRoles) {
    return false
  }
  for (const role of authorizedRoles) {
    if (userRoles.includes(role)) {
      authorized = true
      break
    }
  }
  return authorized
}
