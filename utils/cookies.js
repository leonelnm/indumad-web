import Cookies from "js-cookie"

export const cookieNames = {
  user: "svcnavalparUser",
}

const options = {
  sameSite: "lax",
  secure: true,
  expires: 0.5, // 12h
}

export function createCookie({ key = "", value = "" }) {
  if (key !== "") {
    Cookies.set(key, value, options)
  }
}

export function deleteCookie(key) {
  const tmpOptions = { ...options }
  delete tmpOptions.expires
  Cookies.remove(key, tmpOptions)
}

export function getCookie(key) {
  const value = Cookies.get(key)
  return value || ""
}

export function getUserCookie() {
  return getCookie(cookieNames.user)
}
