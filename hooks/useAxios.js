import { indumadApi } from "api"
import { useEffect, useState } from "react"

export const useAxios = ({
  method,
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
    const fetchData = async () => {
      try {
        indumadApi[method](url, body, config)
          .then((res) => {
            setData({
              status: res.status,
              data: res.data,
            })
          })
          .catch((error) => {
            let status = error.response.status
            if (error.request) {
              status = 500
            }
            setError({
              status,
              error: error.response.data,
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      } catch (err) {
        setError({
          status: 500,
          error: err,
        })
      }
    }

    fetchData()
  }, [method, url, body, config])

  return { response: data, error, isLoading }
}
