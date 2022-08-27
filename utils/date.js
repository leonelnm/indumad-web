const getCurrentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone

export const getDate = (date = undefined) => {
  return date
    ? new Date(date).toLocaleDateString("es-ES", {
        timeZone: getCurrentTimeZone(),
      })
    : ""
}

export const getTime = (date = undefined) => {
  return date
    ? new Date(date).toLocaleTimeString("es-ES", {
        timeZone: getCurrentTimeZone(),
      })
    : ""
}

export const getDateTime = (date = new Date()) => {
  return `${getDate(date)} ${getTime(date)}`
}
