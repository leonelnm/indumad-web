import axios from "axios"

export const indumadApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INDUMAD_API,
})

export const indumadRoutes = {
  auth: {
    LOGIN: "/auth/login",
    VALIDA_TOKEN: "/auth/validateToken",
  },
}
