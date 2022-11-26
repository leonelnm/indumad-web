import "../styles/globals.css"
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { SWRConfig } from "swr"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { AuthProvider, JobProvider, UIProvider } from "context"
import { lightTheme } from "themes"
import { indumadApi } from "api"
import { LoadingScreen } from "components/LoadingScreen"
import WithPrivateRoute from "components/WithPrivateRoute"

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

const Noop = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }) {
  const Auth = Component.Auth === false ? Noop : WithPrivateRoute
  const CustomProvider = Component.provider || Noop

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
              <Auth>
                <JobProvider>
                  <CustomProvider>
                    <Component {...pageProps} />
                  </CustomProvider>
                </JobProvider>
              </Auth>
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
