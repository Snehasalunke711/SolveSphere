import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Solve<span>Sphere</span>
      </div>

      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Explore Problems</a>
        <a href="#">How It Works</a>
      </div>

      <div className="navbar-actions">
        <button className="login-button">Login</button>
        <button className="signup-button">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;