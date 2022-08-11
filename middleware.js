import { NextResponse } from "next/server"
import { cookieNames } from "utils/cookies"

const PUBLIC_FILE = /\.(.*)$/

function isAuthenticated(req) {
  const token = req.cookies.get(cookieNames.token)
  return !!token
}

function isAuthorizated() {
  // mirar info en context
  return true
}

export function middleware(req) {
  const pathname = req.nextUrl.pathname

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    console.log("Middleware - validando /login")
    if (isAuthenticated(req)) {
      console.log("Middleware - ya tiene login -> go to /")
      return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin")) {
    console.log("Middleware - validando admin")
    if (isAuthenticated(req)) {
      if (isAuthorizated()) {
        console.log("Middleware - autenticado y autorizado -> go to page")
        return NextResponse.next()
      }
      console.log("Middleware - no authorized -> go to /")
      return NextResponse.redirect(new URL("/", req.url))
    }

    console.log("Middleware - no autenticado on /admin -> redirect to Login")
    return NextResponse.redirect(
      new URL(`/login${pathname !== "/" ? `?from=${pathname}` : ""}`, req.url)
    )
  }

  if (isAuthenticated(req)) {
    console.log("Middleware - is authenticate -> go to page")
    return NextResponse.next()
  }

  console.log("Middleware - no autenticado -> redirect to Login")
  return NextResponse.redirect(
    new URL(`/login${pathname !== "/" ? `?from=${pathname}` : ""}`, req.url)
  )
}
