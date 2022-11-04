import { Box } from "@mui/material"
import { DotFlash } from "components/loaders/DotFlash"
import { useAuthContext } from "hooks/context"
import Head from "next/head"
import { Navbar, Sidebar } from "../../ui"

export const MainLayout = ({ children, title = "Servicios Navalpar SL" }) => {
  const { user } = useAuthContext()

  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      {user ? (
        <>
          <header>
            <Navbar />
          </header>
          <Sidebar />

          <Box component="main" p={2}>
            {children}
          </Box>
        </>
      ) : (
        <DotFlash />
      )}
    </Box>
  )
}
