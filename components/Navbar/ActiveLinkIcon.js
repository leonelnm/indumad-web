import Link from "next/link"
import { useRouter } from "next/router"

import styles from "./navbar.module.scss"

export const ActiveLinkIcon = ({
  text = "",
  href = "",
  clazz = "",
  color = "",
  icon,
}) => {
  const { asPath } = useRouter()
  const active = asPath === href ? "is-active" : ""

  return (
    <Link href={href}>
      <a className={`${clazz} ${active}`}>
        <span className={styles.text}>{text}</span>
      </a>
    </Link>
  )
}
