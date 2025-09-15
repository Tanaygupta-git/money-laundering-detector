import React, { useState } from "react";
import { uploadFile } from "../api";

const DetectionPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setResult(null);
    setError("");
    if (!file) {
      setError("Please select a file.");
      return;
    }
    try {
      const res = await uploadFile(file);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to process file.");
    }
  }

  return (
    <div className="container">
      <h2>File Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept=".csv,.pdf,.jpg,.jpeg,.png,.xlsx"
          onChange={handleFileChange}
        />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div className="result">
          <h3>Analysis Result</h3>
          <p>
            <b>Status:</b> {result.prediction} <br />
            <b>Confidence:</b> {result.confidence}%
          </p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default DetectionPage;