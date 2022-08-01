import { Tab as TabMUI } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./tab.module.css"

export const Tab = (props) => {
  // TODO extrar el username logueado para crear rutas dinámicas

  const [active, setactive] = useState(false)

  const router = useRouter()

  const path = `${props.path}${props.query ? `?tab=${props.query}` : ""}`

  const validateActive = () => {
    const { tab } = router.query
    router.asPath === path || (!tab && router.asPath === props.default?.path)
      ? setactive(true)
      : setactive(false)
  }

  useEffect(() => {
    validateActive()
  }, [router])

  return (
    <Link
      replace
      // href={{ pathname: "newprofile", query: { tab: props.query } }}
      href={path}
      passHref
    >
      <TabMUI
        className={active ? styles.selectedTab : ""}
        component={"a"}
        label={props.text}
      />
    </Link>
  )
}
