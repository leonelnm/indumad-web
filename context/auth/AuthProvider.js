import { useCallback, useEffect, useReducer } from "react"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

import { AuthContext, authReducer, AUTH_STATES } from "."
import { login, validateToken } from "services"
import * as cookiesUtil from "utils/cookies"

const INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  useEffect(() => {
    validateTokenHandler()
    validateInfoOnContext()
  }, [router])

  const validateInfoOnContext = () => {
    if (router.asPath !== "/login" && !state.isLoggedIn) {
      logout()
    }
  }

  const validateTokenHandler = async () => {
    if (!Cookies.get(cookiesUtil.cookieNames.token)) {
      return
    }

    try {
      const token = cookiesUtil.getCookie(cookiesUtil.cookieNames.token)
      if (!token) {
        logout()
        return
      }

      const { ok, data } = await validateToken({ token })

      if (ok) {
        const { token, user } = data
        // Update token if created
        cookiesUtil.createCookie({
          key: cookiesUtil.cookieNames.token,
          value: token,
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
    try {
      const { ok, status, data } = await login({ username, password })
      if (ok) {
        const { token, user } = data
        cookiesUtil.createCookie({
          key: cookiesUtil.cookieNames.token,
          value: token,
        })
        dispatch({ type: AUTH_STATES.LOGIN, payload: user })
      }
      return { ok, status, data }
    } catch (error) {
      // TODO add sentry
      return {
        ok: false,
        status: 500,
      }
    }
  }

  const logout = useCallback(() => {
    console.log("Logout")
    cookiesUtil.deleteCookie(cookiesUtil.cookieNames.token)
    dispatch({ type: AUTH_STATES.LOGOUT })
    router.replace("/login")
  }, [])

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
