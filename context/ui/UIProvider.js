import { useReducer } from "react"
import { UIContext, uiReducer, STATES } from "./"

const INITIAL_STATE = {
  sideMenuOpen: false,
  sideMenuAdministrationOpen: false,
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE)

  const openSideBar = () => {
    dispatch({ type: STATES.OPEN })
  }

  const closeSideBar = () => {
    dispatch({ type: STATES.CLOSE })
  }

  const handleSideBarAdministration = () => {
    dispatch({
      type: STATES.HANDLE_ADMINISTRATION,
      payload: !state.sideMenuAdministrationOpen,
    })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        // functions
        openSideBar,
        closeSideBar,
        handleSideBarAdministration,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
