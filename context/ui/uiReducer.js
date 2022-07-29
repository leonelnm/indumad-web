export const STATES = {
  OPEN: "UI-Open Sidebar",
  CLOSE: "UI-Close Sidebar",
  HANDLE_ADMINISTRATION: "UI-Open Sidebar Administration",
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

    case STATES.HANDLE_ADMINISTRATION:
      return {
        ...state,
        sideMenuAdministrationOpen: action.payload,
      }

    default:
      return state
  }
}
