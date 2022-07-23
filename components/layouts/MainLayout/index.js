import { Box } from "@mui/material"
import Head from "next/head"
import { Navbar, Sidebar } from "../../ui"

export const MainLayout = ({ children, title = "Indumad" }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: "1rem 1.5rem" }}>{children}</Box>
    </Box>
  )
}
