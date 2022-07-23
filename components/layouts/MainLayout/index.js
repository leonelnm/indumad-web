import Head from "next/head"
import { Navbar } from "components/Navbar"
import styles from "./mainlayout.module.scss"

export const MainLayout = ({ children, title = "" }) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className="container mt-4">{children}</main>
    </main>
  )
}
