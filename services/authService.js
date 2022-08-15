import { indumadApi, indumadRoutes } from "api"
import { cookieNames, getCookie } from "utils/cookies"

export async function login({ username, password }) {
  return await indumadApi
    .post(indumadRoutes.auth.LOGIN, {
      username,
      password,
    })
    .then((res) => {
      return {
        ok: true,
        status: res.status,
        data: res.data,
      }
    })
    .catch((error) => {
      let status = error.response.status
      if ([500, 0].includes(status)) {
        status = 500
        // TODO add sentry
      }

      return {
        ok: false,
        status,
        error: error.response.data,
      }
    })
}

export async function validateToken({ token = "" }) {
  indumadApi.defaults.headers.Authorization = `Bearer ${token}`
  return await indumadApi
    .get(indumadRoutes.auth.VALIDA_TOKEN, {
      withCredentials: true,
    })
    .then((res) => {
      return {
        ok: true,
        status: res.status,
        data: res.data,
      }
    })
    .catch((error) => {
      let status = error.response.status
      if ([500, 0].includes(status)) {
        status = 500
        // TODO add sentry
      }

      return {
        ok: false,
        status,
        error: error.response.data,
      }
    })
}

export const getToken = () => getCookie(cookieNames.token)
