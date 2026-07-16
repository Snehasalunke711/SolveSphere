import { Link } from "react-router";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="navbar-logo"
        onClick={() => setMenuOpen(false)}
      >
        Solve<span>Sphere</span>
      </Link>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <div className="navbar-links">
          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
          >
            Explore Problems
          </Link>

          <a
            href="/#how-it-works"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </a>
        </div>

        <div className="navbar-actions">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            <button className="login-button">
              Login
            </button>
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
          >
            <button className="signup-button">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;