import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <Link className="navbar-brand" to="/">ML Detector</Link>
    <div className="navbar-links">
      <Link to="/detect">Detection</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/admin">Admin</Link>
    </div>
  </nav>
);
export default Navbar;