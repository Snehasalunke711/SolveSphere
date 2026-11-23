import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath =
    user?.role === "owner" ? "/owner-dashboard" : "/dashboard";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

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
          <Link to="/explore" onClick={() => setMenuOpen(false)}>
            Explore Problems
          </Link>

          {!user && (
            <a
              href="/#how-it-works"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </a>
          )}

          {user && (
            <Link to={dashboardPath} onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {user && (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
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
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="signup-button"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              className="login-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;