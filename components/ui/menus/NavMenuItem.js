import { MenuItem } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"

export const NavMenuItem = ({ list = [], handleClose }) => {
  const { asPath } = useRouter()

  return (
    <>
      {list.map(({ text, path, icon }) => (
        <Link key={text} href={path} passHref>
          <MenuItem
            className={asPath === path ? "activeLink" : ""}
            button
            component="a"
            onClick={handleClose}
          >
            {text}
          </MenuItem>
        </Link>
      ))}
    </>
  )
}
