import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>
            Solve<span>Sphere</span>
          </h3>

          <p>
            Connecting real-world problems with people who can build meaningful
            solutions.
          </p>
        </div>

        <div className="footer-links">
          <a href="#">Explore Problems</a>
          <a href="#">How It Works</a>
          <a href="#">Login</a>
          <a href="#">Register</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SolveSphere. Built to turn problems into solutions.</p>
      </div>
    </footer>
  );
}

export default Footer;