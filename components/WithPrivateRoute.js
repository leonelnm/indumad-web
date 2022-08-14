import { useEffect } from "react"
import { useRouter } from "next/router"

import { cookieNames, getCookie } from "utils/cookies"

const WithPrivateRoute = ({ children }) => {
  const token = getCookie(cookieNames.token)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [])

  return <>{children}</>
}

export default WithPrivateRoute
