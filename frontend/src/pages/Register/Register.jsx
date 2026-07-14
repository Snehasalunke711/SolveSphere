import "../Login/Login.css";
import { Link } from "react-router";

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          Solve<span>Sphere</span>
        </div>

        <h1>Create your account</h1>
        <p className="auth-description">
          Join SolveSphere and turn real-world problems into meaningful solutions.
        </p>

        <form className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>I want to join as</label>
            <select required defaultValue="">
              <option value="" disabled>
                Select your role
              </option>
              <option value="solver">Problem Solver</option>
              <option value="owner">Problem Owner</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
  Already have an account? <Link to="/login">Sign in</Link>
</p>
      </div>
    </div>
  );
}

export default Register;