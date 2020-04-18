import React from "react";
import ReactQuill from "react-quill";

const Editor = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        { list: "bullet" },
        { list: "ordered" },
      ],
      ["link", "blockquote"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div style={style} className="text-editor">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={props.handleChangeEditorValue}
      ></ReactQuill>
    </div>
  );
};

const style = {
  maxWidth: "500px",
};

export default Editor;
