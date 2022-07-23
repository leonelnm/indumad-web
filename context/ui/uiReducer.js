export const STATES = {
  OPEN: "UI-Open Sidebar",
  CLOSE: "UI-Close Sidebar",
}

// Retorna el estado luego de aplicar las acciones correspondientes
export const uiReducer = (state, action) => {
  switch (action.type) {
    case STATES.OPEN:
      return {
        ...state,
        sideMenuOpen: true,
      }

    case STATES.CLOSE:
      return {
        ...state,
        sideMenuOpen: false,
      }

    default:
      return state
  }
}
