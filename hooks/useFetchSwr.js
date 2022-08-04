import useSWR from "swr"

export const useFetchSwr = ({ path, token = "" }) => {
  const { data, error } = useSWR([path, token])

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
