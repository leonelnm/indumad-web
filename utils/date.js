const getCurrentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone

export const getDate = (date = undefined) => {
  return date
    ? new Date(date).toLocaleDateString("es-ES", {
        timeZone: getCurrentTimeZone(),
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : ""
}

export const getTime = (date = undefined) => {
  return date
    ? new Date(date).toLocaleTimeString("es-ES", {
        timeZone: getCurrentTimeZone(),
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""
}

export const getDateTime = (date = new Date()) => {
  return `${getDate(date)} ${getTime(date)}`
}

export const getDateToShow = (date) => {
  if (getDate(new Date()) === getDate(date)) {
    return getTime(date)
  }
  return getDateTime(date)
}
