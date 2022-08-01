import { Box, Container, Link as LinkMui, Typography } from "@mui/material"
import Head from "next/head"
import Link from "next/link"

export default function Custom404Page() {
  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Page not found</title>
      </Head>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h5">Página no encontrada</Typography>
        <Link href={"/"} passHref>
          <LinkMui underline="always">Ir a la pantalla principal</LinkMui>
        </Link>
      </Box>
    </Container>
  )
}
