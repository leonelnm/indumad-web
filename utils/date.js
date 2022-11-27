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

export const getListMonths = () => {
  // return [...Array(12).keys()].map((key) =>
  //   new Date(0, key).toLocaleString("es", { month: "long" })
  // )

  return [
    { id: 1, name: "enero" },
    { id: 2, name: "febrero" },
    { id: 3, name: "marzo" },
    { id: 4, name: "abril" },
    { id: 5, name: "mayo" },
    { id: 6, name: "junio" },
    { id: 7, name: "julio" },
    { id: 8, name: "agosto" },
    { id: 9, name: "septiembre" },
    { id: 10, name: "octubre" },
    { id: 11, name: "noviembre" },
    { id: 12, name: "diciembre" },
  ]
}
