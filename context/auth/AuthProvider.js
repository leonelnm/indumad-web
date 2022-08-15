import { useEffect, useReducer } from "react"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

import { AuthContext, authReducer, AUTH_STATES } from "."
import { login, validateToken } from "services"
import * as cookiesUtil from "utils/cookies"
import * as localStorageUtil from "utils/localStorageUtil"

const INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  useEffect(() => {
    if (localStorageUtil.getItem(localStorageUtil.itemsLocalStorage.user)) {
      dispatch({
        type: AUTH_STATES.LOGIN,
        payload: localStorageUtil.getItem(
          localStorageUtil.itemsLocalStorage.user
        ),
      })
    }
  }, [])

  useEffect(() => {
    validateTokenHandler()
  }, [router])

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

        // Si user es diferente del user en localStorage
        if (
          !localStorageUtil.isEqual(
            localStorageUtil.itemsLocalStorage.user,
            state?.user
          )
        ) {
          localStorageUtil.setItem(
            localStorageUtil.itemsLocalStorage.user,
            user
          )
          dispatch({ type: AUTH_STATES.LOGIN, payload: user })
        }
      } else {
        logout()
      }
    } catch (error) {
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
        localStorageUtil.setItem(localStorageUtil.itemsLocalStorage.user, user)
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

  const logout = () => {
    cookiesUtil.deleteCookie(cookiesUtil.cookieNames.token)
    localStorageUtil.removeItem(localStorageUtil.itemsLocalStorage.user)
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
