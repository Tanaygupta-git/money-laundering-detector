import React from "react";
const AboutPage = () => (
  <div className="container">
    <h2>About the System</h2>
    <p>
      This system uses state-of-the-art AI and machine learning models to analyze financial and identification documents for suspicious activity patterns (such as layering, structuring, and round-trip transactions).
    </p>
    <ul>
      <li>Multi-format file support (CSV, PDF, images, Excel)</li>
      <li>OCR for documents and images</li>
      <li>Hybrid ML algorithms for accurate detection</li>
      <li>Admin dashboard and reporting</li>
      <li>Secure and privacy-focused</li>
    </ul>
    <h3>How it Works</h3>
    <ol>
      <li>Upload your document or data file via the Detection page</li>
      <li>Backend extracts content, runs AI/ML analysis</li>
      <li>Get instant prediction and risk score</li>
    </ol>
  </div>
);
export default AboutPage;