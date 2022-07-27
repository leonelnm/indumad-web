export const AUTH_STATES = {
  LOGIN: "AUTH - login",
  LOGOUT: "AUTH - logout",
}

// Retorna el estado luego de aplicar las acciones correspondientes
export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_STATES.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }

    case AUTH_STATES.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }

    default:
      return state
  }
}
