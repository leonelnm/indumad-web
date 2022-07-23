import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useUser = () => {
  const { data, error } = useSWR(`http://localhost:3010/api/v1/user`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
