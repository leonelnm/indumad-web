import { Box } from "@mui/material"
import Head from "next/head"
import { Navbar, Sidebar } from "../../ui"

export const MainLayout = ({ children, title = "Indumad" }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <Navbar />
      </header>
      <Sidebar />

      <Box component="main" p={2}>
        {children}
      </Box>
    </Box>
  )
}
