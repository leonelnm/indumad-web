import axios from "axios"
import { getCustomErrorMessage } from "utils/errorMessages"
import { getToken } from "utils/localStorageUtil"

export const indumadApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INDUMAD_API,
  withCredentials: true,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export const indumadRoutes = {
  auth: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    VALIDA_TOKEN: "/auth/validateToken",
    VALIDA_COOKIE: "/auth/validatecookie",
  },
  user: "/user",
  guild: "/guild",
  reference: "/reference",
  job: {
    path: "/job",
    deliveryNote: "/job/deliverynote",
  },
  notes: {
    basePath: "/followupnotes",
    markAsRead: "/followupnotes/markasread",
  },
  evidences: {
    add: "/evidence/upload",
    delete: "/evidence",
    findAll: "/evidence",
  },
  schedule: {
    path: "/schedule",
  },
}

export const indumadClient = async ({
  method = "get",
  url,
  body = {},
  config = {},
  token = "",
}) => {
  try {
    indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`
    const { data } = await indumadApi[method](url, body, config)
    return { data }
  } catch (error) {
    console.log(error)
    if (error.response) {
      let err = {
        data: error.response.data,
        code: error.code,
        name: error.name,
        msg:
          (error.response.data && error.response.data.msg) ||
          error.name ||
          error.message,
      }

      if (error.response.data && error.response.data.msg) {
        err = getCustomErrorMessage(error.response.data.msg)
      }

      return { error: err }
    } else if (error.request) {
      return { error: error.request }
    }
    return { error: error.message }
  }
}
