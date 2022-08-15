import axios from "axios"

export const indumadApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INDUMAD_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export const indumadRoutes = {
  auth: {
    LOGIN: "/auth/login",
    VALIDA_TOKEN: "/auth/validateToken",
  },
  user: "/user",
  guild: "/guild",
  reference: "/reference",
}

export const indumadClient = async ({
  method = "get",
  url,
  body = {},
  config = {},
  token = "",
}) => {
  try {
    indumadApi.defaults.headers.Authorization = `Bearer ${token}`
    const data = await indumadApi[method](url, body, config)
    return { data }
  } catch (error) {
    if (error.response) {
      const err = {
        data: error.response.data,
        code: error.code,
        name: error.name,
        msg: error.message || error.response.data || error.code || error.name,
      }
      return { error: err }
    } else if (error.request) {
      return { error: error.request }
    }
    return { error: error.message }
  }
}
