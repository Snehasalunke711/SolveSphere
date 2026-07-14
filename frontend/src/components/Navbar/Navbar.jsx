import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Solve<span>Sphere</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore Problems</Link>
        <a href="/#how-it-works">How It Works</a>
      </div>

      <div className="navbar-actions">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>

        <Link to="/register">
          <button className="signup-button">Get Started</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;