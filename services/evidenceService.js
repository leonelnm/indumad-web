import { indumadApi, indumadRoutes } from "api"
import { getToken } from "utils/localStorageUtil"

export const uploadImage = async ({ jobId, data }) => {
  indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`

  const url = `${indumadRoutes.evidences.add}/${jobId}`

  return await indumadApi
    .post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return {
        ok: true,
        status: res.status,
        data: res.data,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        error: error.response.data,
      }
    })
}

export const deleteEvidence = async ({ id }) => {
  indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`

  const url = `${indumadRoutes.evidences.delete}/${id}`

  return await indumadApi
    .delete(url)
    .then((res) => {
      return {
        ok: true,
        status: res.status,
        data: res.data,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        error: error.response.data,
      }
    })
}
