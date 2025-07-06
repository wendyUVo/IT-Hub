import React, { useRef, useState } from "react";
import { Form, Message } from "semantic-ui-react";

const FileUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1048576) {
      setSuccessMessage("");
      setErrorMessage("File size cannot exceed more than 1MB");
    } else {
      setErrorMessage("");
      setSuccessMessage("File has been added");
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <Form>
      <Form.Input
        type="file"
        label="Upload File"
        onChange={handleFileInput}
        ref={fileInput}
        accept=".jpg,.jpeg,.png,.pdf"
      />

      {successMessage && (
        <Message color="teal" icon="check" header={successMessage} />
      )}

      {errorMessage && (
        <Message warning icon="exclamation" header={errorMessage} />
      )}
    </Form>
  );
};

export default FileUploader;
