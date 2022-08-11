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
    const handleStart = (url) => {
      setLoading(true)
    }
    const handleStop = () => {
      setLoading(false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
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
