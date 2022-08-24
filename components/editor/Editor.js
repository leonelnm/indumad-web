import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
]

const Editor = ({ setText, text, validation, placeholder = "" }) => {
  return (
    <QuillNoSSRWrapper
      className={`editorHeigh ${validation.error ? "valitationError" : ""}`}
      modules={modules}
      formats={formats}
      theme="snow"
      value={text}
      onChange={setText}
      placeholder={placeholder}
    />
  )
}

export default Editor
