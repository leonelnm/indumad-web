import useSWR from "swr"

export const useFetchSwr = ({ path, token = "" }) => {
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
