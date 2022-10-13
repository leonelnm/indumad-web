import { indumadApi } from "api"
import { useEffect, useState } from "react"
import { getToken } from "utils/localStorageUtil"

export const useAxios = ({
  method = "get",
  url,
  body = {},
  config = {},
  token = "",
}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  indumadApi.defaults.headers.Authorization = `Bearer ${getToken()}`

  useEffect(() => {
    indumadApi[method](url, body, config)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        setError(error.message)
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
