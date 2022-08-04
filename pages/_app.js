import "../styles/globals.css"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { SWRConfig } from "swr"
import { lightTheme } from "themes"
import { AuthProvider, UIProvider } from "context"
import { indumadApi } from "api"

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
