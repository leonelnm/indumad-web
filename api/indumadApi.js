import axios from "axios"

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
    VALIDA_TOKEN: "/auth/validateToken",
    VALIDA_COOKIE: "/auth/validatecookie",
  },
  user: "/user",
  guild: "/guild",
  reference: "/reference",
  job: "/job",
}

export const indumadClient = async ({
  method = "get",
  url,
  body = {},
  config = {},
  token = "",
}) => {
  try {
    // indumadApi.defaults.headers.Authorization = `Bearer ${token}`
    const { data } = await indumadApi[method](url, body, config)
    return { data }
  } catch (error) {
    console.log(error)
    if (error.response) {
      const err = {
        data: error.response.data,
        code: error.code,
        name: error.name,
        msg:
          (error.response.data && error.response.data.msg) ||
          error.name ||
          error.message,
      }
      return { error: err }
    } else if (error.request) {
      return { error: error.request }
    }
    return { error: error.message }
  }
}
