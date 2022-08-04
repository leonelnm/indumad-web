import { indumadApi, indumadRoutes } from "api"

export const findAll = async ({ token = "" }) => {
  indumadApi.defaults.headers.Authorization = `Bearer ${token}`
  return await indumadApi
    .get(indumadRoutes.user.FINDALL, {
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
        console.log("UserService - findAll, internal error")
        status = 500
        // TODO add sentry
      }

      console.log("UserService - findAll")
      console.error(error.message)
      console.log("END - UserService - findAll")
      return {
        ok: false,
        status,
        error: error.response.data,
      }
    })
}
