import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const VersionedEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  const [versions, setVersions] = useState([]);

  const handleSave = () => {
    const currentDate = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newVersion = {
      content: editorValue,
      timestamp: currentDate,
    };

    setVersions((prevVersions) => [...prevVersions, newVersion]);
    setEditorValue("");
    localStorage.setItem("versions", JSON.stringify(versions));
  };

  const handleVersionClick = (version) => {
    const contentDelta = editorValue !== version.content;

    if (
      !contentDelta ||
      window.confirm("Are you sure you want to overwrite the content?")
    ) {
      setEditorValue(version.content);
    }
  };

  return (
    <div className="versioned-editor">
      <div className="ql-container">
        <h2>Write your content below:</h2>

        <ReactQuill value={editorValue} onChange={setEditorValue} />
        <div className="button-container">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="version-list">
        <h2>Saved Versions:</h2>
        {versions.map((version, index) => (
          <div key={index} onClick={() => handleVersionClick(version)}>
            {version.timestamp}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionedEditor;
