import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global.css";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="navbar">
      <div className="logo">Art<br />Connect</div>
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Search artworks or artists..." />
        <button type="submit" tabIndex={-1} aria-label="Search">🔍</button>
      </form>
      <nav className="nav-links">
        <Link to="/" className={pathname === "/" ? "active-btn" : ""}>Home</Link>
        <Link to="/artists" className={pathname === "/artists" ? "active-btn" : ""}>Artists</Link>
        <Link to="/purchase" className={pathname === "/purchase" ? "active-btn" : ""}>Purchase</Link>
        <Link to="/about" className={pathname === "/about" ? "active-btn" : ""}>About</Link>
        <Link to="/login" className={pathname === "/login" || pathname === "/signup" ? "active-btn" : ""}>Login or Sign Up</Link>
      </nav>
    </header>
  );
}
