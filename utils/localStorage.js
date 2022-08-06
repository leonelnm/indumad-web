export const itemsLocalStorage = { user: "indumadUserLogged" }

export const setItem = (key = "", value) => {
  if (typeof window !== "undefined" && key && value) {
    window.localStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : value
    )
  }
}

export const getItem = (key = "") => {
  if (typeof window === "undefined") {
    return null
  }

  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItem = (key = "") => {
  if (typeof window !== "undefined" && key) {
    window.localStorage.removeItem(key)
  }
}
