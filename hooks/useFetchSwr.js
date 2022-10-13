import useSWR from "swr"
import { getToken } from "utils/localStorageUtil"

export const useFetchSwr = ({ path }) => {
  const token = getToken()
  try {
    const { data, error } = useSWR([path, token])
    return {
      data,
      isLoading: !error && !data,
      error,
    }
  } catch (error) {
    return {
      isLoading: false,
      error,
    }
  }
}
