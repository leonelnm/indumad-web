import { NextResponse } from "next/server"
import { cookieNames } from "utils/cookies"

const routesToken = [
  { path: "/" },
  { startBy: "/admin" },
  { startBy: "/user" },
  { startBy: "/calendar" },
  { startBy: "/facturacion" },
  { startBy: "/notifications" },
]

const isPathInRoutes = ({ pathname }) => {
  const find = routesToken.find(({ path, startBy }) =>
    path ? path === pathname : pathname.startsWith(startBy)
  )
  return find !== undefined
}

export function middleware(req, event) {
  const token = req.cookies.get(cookieNames.token)
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith("/login")) {
    if (token) {
      const url = req.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    } else {
      return NextResponse.next()
    }
  }

  if (isPathInRoutes({ pathname })) {
    // valida token para todas las rutas que necesiten, sino envía al login
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = `/login`
      return NextResponse.redirect(url)
    }
  }

  if (pathname.startsWith("/admin")) {
    // TODO revisar role
    return NextResponse.next()
  }

  return NextResponse.next()
}
