import { useEffect, useReducer } from "react"
import { useRouter } from "next/router"

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
    if (
      cookiesUtil.getUserCookie() &&
      !localStorageUtil.isUserInLocalStorage(state?.user)
    ) {
      console.log("STEP- INIT loadLocalStorage ")
      dispatch({
        type: AUTH_STATES.LOGIN,
        payload: localStorageUtil.getItem(
          localStorageUtil.itemsLocalStorage.user
        ),
      })
      console.log("STEP- END loadLocalStorage ")
    }
  }, [])

  useEffect(() => {
    console.log("STEP- INIT validateTokenHandler ")
    validateTokenHandler()
    console.log("STEP- END validateTokenHandler ")
  }, [router])

  const validateTokenHandler = async () => {
    if (!cookiesUtil.getUserCookie()) {
      console.log("validateTokenHandler -> primer if")
      console.log("No hay cookie o aun no la ha leido")
      return
    }

    try {
      const token = cookiesUtil.getUserCookie()
      if (!token) {
        logout()
        return
      }

      const { ok, data } = await validateToken({ token })

      if (ok) {
        const { user } = data
        // Update token if created
        cookiesUtil.createCookie({
          key: cookiesUtil.cookieNames.user,
          value: JSON.stringify(user),
        })

        // Si user es diferente del user en localStorage
        if (!localStorageUtil.isUserInLocalStorage(state?.user)) {
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
        const { user } = data
        cookiesUtil.createCookie({
          key: cookiesUtil.cookieNames.user,
          value: JSON.stringify(user),
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

  const logout = async () => {
    console.log("STEP - Init Logout")
    cookiesUtil.deleteCookie(cookiesUtil.cookieNames.user)
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
