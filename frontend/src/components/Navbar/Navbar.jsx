
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isOwner = user?.role === "owner";

  const dashboardPath = isOwner ? "/owner-dashboard" : "/dashboard";

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
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
          {!user && (
            <a href="/#how-it-works" onClick={closeMenu}>
              How It Works
            </a>
          )}

          {user && !isOwner && (
            <Link to="/explore" onClick={closeMenu}>
              Explore Problems
            </Link>
          )}

          {user && (
            <Link to={dashboardPath} onClick={closeMenu}>
              Dashboard
            </Link>
          )}

          {user && (
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link
                to="/login"
                className="login-button"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="signup-button"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
