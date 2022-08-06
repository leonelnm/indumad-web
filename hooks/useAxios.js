import { indumadApi } from "api"
import { useEffect, useState } from "react"

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

  indumadApi.defaults.headers.Authorization = `Bearer ${token}`

  useEffect(() => {
    if (!token) {
      setError("Token not found")
      setIsLoading(false)
      return { data, error, isLoading }
    }

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

  return { data, error, isLoading }
}
