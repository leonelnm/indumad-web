import { indumadApi, indumadClient, indumadRoutes } from "api"

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

export const findByGuild = async ({ token = "", guild = "" }) => {
  console.log("STEP: userService.findByGuild")
  const url = `${indumadRoutes.user}/guild/${guild}`
  const { error, data } = await indumadClient({
    url,
    token,
  })

  if (error) return error

  const users = data.map((user) => {
    return {
      id: user.id,
      fullname: `${user.name} ${user.lastname} (${user.dni})`,
    }
  })

  return { data: users }
}
