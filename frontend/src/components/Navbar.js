import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">TXDOT</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rating">Asset Rating</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/map">Map</Link></li>
        
        
      </ul>
    </nav>
  );
}

export default Navbar;