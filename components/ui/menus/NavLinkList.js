import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useUiContext } from "hooks/context"
import Link from "next/link"
import { useRouter } from "next/router"

export const NavLinkList = ({ list = [], pl = 2 }) => {
  const { closeSideBar } = useUiContext()
  const { asPath } = useRouter()

  return (
    <>
      {list.map(({ text, path, icon }) => (
        <Link key={text} href={path} passHref>
          <ListItem
            className={asPath === path ? "activeLink" : ""}
            sx={{ pl }}
            button
            component="a"
            onClick={closeSideBar}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      ))}
    </>
  )
}
