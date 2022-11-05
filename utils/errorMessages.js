export const getCustomErrorMessage = (msg) => {
  const key = Object.keys(errorMessages).find(
    (item) => errorMessages[item].msg === msg
  )

  if (key) {
    return errorMessages[key]
  }

  return { msg }
}

export const errorMessages = {
  deliveryNoteNoReady: {
    msg: "Job has not yet been assigned to the worker",
    translate: `Este trabajo está pendiente de asignación por lo que no es posible generar un Albarán"`,
  },
  userUsernameDuplicate: {
    msg: "Usuario ya existe",
    translate: "El usuario ya existe, pruebe con otro nombre de usuario",
  },
  userDniDuplicate: {
    msg: "DNI ya existe",
    translate:
      "Este NIF/DNI/NIE ya fue registrado con otro usuario, revise la información!",
  },
}
