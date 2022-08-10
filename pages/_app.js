import "../styles/globals.css"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { SWRConfig } from "swr"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { AuthProvider, UIProvider } from "context"
import { lightTheme } from "themes"
import { indumadApi } from "api"
import { LoadingScreen } from "components/LoadingScreen"

function Loading() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false)
      }, 5000)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })

  return loading && <LoadingScreen />
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Loading />
      <SWRConfig
        value={{
          fetcher: async (url, token) =>
            await indumadApi
              .get(url, { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => res.data),
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
