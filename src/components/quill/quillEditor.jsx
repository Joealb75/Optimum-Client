import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillEditor = ({ value, onChange }) => {
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
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <div style={{ height: "400px", overflowY: "auto" }}>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          placeholder="Compose an article..."
          theme="snow"
          style={{ height: '100%' }}
        />
      </div>
    </>
  );
};
