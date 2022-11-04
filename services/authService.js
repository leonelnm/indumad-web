import { indumadApi, indumadRoutes } from "api"
import { getToken } from "utils/localStorageUtil"

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

export async function validateToken() {
  indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`

  return await indumadApi
    .get(indumadRoutes.auth.VALIDA_TOKEN)
    .then((res) => {
      return {
        ok: true,
        status: res.status,
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

export async function changePassword(userId, data) {
  indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`

  return await indumadApi
    .put(`${indumadRoutes.user}/${userId}/password`, data)
    .then((res) => {
      console.log(res)
      return {
        ok: true,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        error: error.response.data,
      }
    })
}
