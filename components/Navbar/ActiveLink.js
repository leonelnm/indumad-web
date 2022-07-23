import Link from "next/link"
import { useRouter } from "next/router"

export const ActiveLink = ({ text = "", href = "", clazz = "" }) => {
  const { asPath } = useRouter()
  const active = asPath === href ? "is-active" : ""

  return (
    <Link href={href}>
      <a className={`${clazz} ${active}`}>{text}</a>
    </Link>
  )
}
