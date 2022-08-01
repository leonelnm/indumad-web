import { Container } from "@mui/material"
import Head from "next/head"

export const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Indumad | {title}</title>
      </Head>
      <Container component="main" maxWidth="xs">
        {children}
      </Container>
    </>
  )
}
