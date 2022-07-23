import useSWR from "swr"

export const useFetch = ({ path, config = {} }) => {
  const { data, error } = useSWR(`http://localhost:3010/api/v1${path}`, config)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
