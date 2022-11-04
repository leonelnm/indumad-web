export const itemsLocalStorage = {
  user: "svcnavalparUserLogged",
  token: "svcnavalparUserToken",
}

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

export const getItemAsText = (key = "") => {
  if (typeof window === "undefined") {
    return ""
  }

  return window.localStorage.getItem(key)
}

export const removeItem = (key = "") => {
  if (typeof window !== "undefined" && key) {
    window.localStorage.removeItem(key)
  }
}

export const isEqual = (key = "", obj = {}) => {
  if (typeof window === "undefined") {
    return false
  }

  const objStorage = JSON.parse(window.localStorage.getItem(key))
  const keys1 = Object.keys(obj)
  const keys2 = Object.keys(objStorage)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    if (obj[key] !== objStorage[key]) {
      return false
    }
  }
  return true
}

export const isUserInLocalStorage = (user = {}) => {
  return isEqual(itemsLocalStorage.user, user)
}

export const getToken = () => {
  return getItemAsText(itemsLocalStorage.token)
}
