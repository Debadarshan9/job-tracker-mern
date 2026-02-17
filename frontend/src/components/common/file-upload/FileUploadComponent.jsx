import { useEffect, useState } from "react";
import styles from "./FileUpload.module.scss";
import { useRef } from "react";
import { classes } from "../../../utils/utils.js";
const FileUploadComponent = ({ label, onFileChange, existingImage = null }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    } else {
      setPreview(null);
    }
  }, [existingImage]);

  const handleFile = (file) => {
    if (!file) return;

    setFileName(file.name);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    if (onFileChange) {
      onFileChange(file);
    }
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        className={classes(styles.dragDrop, preview ? styles.afterDrop : "")}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <img src={preview} alt="Preview" className={styles.preview} />
        ) : (
          <span>{label}</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {fileName && <span>{fileName}</span>}
    </div>
  );
};

export default FileUploadComponent;
