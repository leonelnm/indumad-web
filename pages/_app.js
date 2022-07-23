import "../styles/globals.scss"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { SWRConfig } from "swr"
import { darkTheme } from "themes"
import { UIProvider } from "context"

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  )
}

export default MyApp
