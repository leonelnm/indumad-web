import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const ViewerEditor = ({ text }) => {
  return <QuillNoSSRWrapper readOnly={true} value={text} theme={"bubble"} />
}

export default ViewerEditor
