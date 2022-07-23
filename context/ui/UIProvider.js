import { useReducer } from "react"
import { UIContext, uiReducer, STATES } from "./"

const INITIAL_STATE = {
  sideMenuOpen: false,
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE)

  const openSideBar = () => {
    dispatch({ type: STATES.OPEN })
  }

  const closeSideBar = () => {
    dispatch({ type: STATES.CLOSE })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        // functions
        openSideBar,
        closeSideBar,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
