import Link from "next/link"

export const CustomToastLink = ({ text, url, urlname }) => {
  return (
    <span>
      {text}
      <Link href={url}>{urlname}</Link>
    </span>
  )
}
