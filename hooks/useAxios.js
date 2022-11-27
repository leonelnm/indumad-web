import { indumadApi } from "api"
import { useEffect, useState } from "react"
import { getCustomErrorMessage } from "utils/errorMessages"
import { getToken } from "utils/localStorageUtil"

export const useAxios = ({
  method = "get",
  url,
  body = {},
  config = {},
  params = {},
  token = "",
}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`

  useEffect(() => {
    indumadApi[method](url, method === "get" ? { params } : body, config)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        setError(getErrorMessage(error))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return {
    data,
    setData,
    error,
    setError,
    isLoading,
    setIsLoading,
  }
}

const getErrorMessage = (error) => {
  const customError = { msg: error.message }
  if (error.response && error.response.data && error.response.data.msg) {
    return getCustomErrorMessage(error.response.data.msg)
  }

  return customError
}
