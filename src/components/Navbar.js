import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/global.css";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout, favorites, cart } = useContext(AuthContext);
  const { isDark, toggle } = useContext(DarkModeContext);
  return (
    <header className="navbar">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div className="logo">Art<br />Connect</div>
        {isAuthenticated && user && <div style={{fontSize:12, color:'#333'}}>Welcome, {user.name}</div>}
      </div>
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Search artworks or artists..." />
        <button type="submit" tabIndex={-1} aria-label="Search">🔍</button>
        <button type="button" className="dark-toggle" onClick={toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {isDark ? '☀️' : '🌙'}
        </button>
      </form>
      <nav className="nav-links">
        <Link to="/" className={pathname === "/" ? "active-btn" : ""}>Home</Link>
        <Link to="/artists" className={pathname === "/artists" ? "active-btn" : ""}>Artists</Link>
        {isAuthenticated && (
          <>
            <Link to="/favorites" className={pathname === "/favorites" ? "active-btn" : ""}>
              Favorites {favorites && favorites.length > 0 ? `(${favorites.length})` : null}
            </Link>
            <Link to="/cart" className={pathname === "/cart" ? "active-btn" : ""}>
              Cart {cart && cart.length > 0 ? `(${cart.reduce((s,i)=>s+(i.qty||1),0)})` : null}
            </Link>
          </>
        )}
        <Link to="/purchase" className={pathname === "/purchase" ? "active-btn" : ""}>Purchase</Link>
        <Link to="/about" className={pathname === "/about" ? "active-btn" : ""}>About</Link>
        {isAuthenticated ? (
          <>
            <Link to="/manage-artworks" className={pathname === "/manage-artworks" ? "active-btn" : ""}>Artwork Manager</Link>
            <a onClick={() => logout()} style={{cursor:'pointer'}}>Logout</a>
          </>
        ) : (
          <Link to="/login" className={pathname === "/login" || pathname === "/signup" ? "active-btn" : ""}>Login or Sign Up</Link>
        )}
      </nav>
    </header>
  );
}
