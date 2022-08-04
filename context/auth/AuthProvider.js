import { useEffect, useReducer } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

import { AuthContext, authReducer, AUTH_STATES } from "."
import { login, validateToken } from "services"

const INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  useEffect(() => {
    validateTokenHandler()
  }, [router])

  const validateTokenHandler = async () => {
    if (!Cookies.get("token")) {
      return
    }

    try {
      const token = Cookies.get("token")
      const { ok, data } = await validateToken({ token })

      if (ok) {
        const { token, user } = data
        Cookies.set("token", token, {
          sameSite: "lax",
          secure: true,
          expires: 0.5, // 12h
        })
        dispatch({ type: AUTH_STATES.LOGIN, payload: user })
      } else {
        logout()
      }
    } catch (error) {
      console.error("STEP: AuthProvider - validateTokenHandler")
      // TODO add sentry
      logout()
    }
  }

  const loginUser = async ({ username, password }) => {
    console.log("AuthProvider: loginUser")

    try {
      const { ok, status, data } = await login({ username, password })
      if (ok) {
        const { token, user } = data
        Cookies.set("token", token, {
          sameSite: "lax",
          secure: true,
          expires: 0.5, // 12h
        })
        dispatch({ type: AUTH_STATES.LOGIN, payload: user })
      }
      return { ok, status, data }
    } catch (error) {
      console.log(error)
      // TODO add sentry
      return {
        ok: false,
        status: 500,
      }
    }
  }

  const logout = () => {
    Cookies.remove("token", { sameSite: "lax", secure: true })
    dispatch({ type: AUTH_STATES.LOGOUT })
    router.replace("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // methods
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
