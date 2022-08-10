import { Loader } from "components/loaders/Loader"
import { createPortal } from "react-dom"

function Loading() {
  return (
    <div className="loadingScreen ">
      <div className="main">
        <Loader />
      </div>
    </div>
  )
}

export const LoadingScreen = () => {
  return createPortal(<Loading />, document.getElementById("loadingScreen"))
}
