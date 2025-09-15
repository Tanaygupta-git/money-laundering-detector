import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>AI-Powered Money Laundering Detection</h1>
      <p>
        Detect suspicious financial activity using advanced AI & ML. Upload your files and get instant risk analysis.
      </p>
      <Link to="/detect" className="cta-btn">Try Detection</Link>
    </div>
  </section>
);

export default HeroSection;