import { useEffect, useReducer } from "react"
import Cookies from "js-cookie"
import { AuthContext, authReducer, AUTH_STATES } from "."
import { login, validateToken } from "services"

const INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  useEffect(() => {
    validateTokenHandler()
  }, [])

  const validateTokenHandler = async () => {
    try {
      const { ok, data } = await validateToken({ token: "" })

      if (ok) {
        const { token, user } = data
        Cookies.set("token", `Bearer ${token}`, {
          sameSite: "lax",
          secure: true,
        })
        dispatch({ type: AUTH_STATES.LOGIN, payload: user })
      } else {
        Cookies.remove("token")
      }
    } catch (error) {
      console.error("STEP: AuthProvider - validateTokenHandler")
      // TODO add sentry
      // Cookies.remove("token")
      return {
        ok: false,
        status: 500,
      }
    }
  }

  const loginUser = async ({ username, password }) => {
    console.log("AuthProvider: loginUser")

    try {
      const { ok, status, data } = await login({ username, password })
      if (ok) {
        const { token, user } = data
        Cookies.set("token", `Bearer ${token}`, {
          sameSite: "lax",
          secure: true,
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

  const logout = () => {
    Cookies.remove("token", { sameSite: "strict" })
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
