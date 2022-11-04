import { LoaderPage } from "components/loaders/LoaderPage"
import { createPortal } from "react-dom"

function Loading() {
  return (
    <div className="loadingScreen ">
      <div className="main">
        <LoaderPage />
      </div>
    </div>
  )
}

export const LoadingScreen = () => {
  return createPortal(<Loading />, document.getElementById("loadingScreen"))
}
