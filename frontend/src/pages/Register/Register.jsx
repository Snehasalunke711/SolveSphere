
import "../Login/Login.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    const password = e.target.password.value;

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        role,
      });

      alert("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>I want to join as</label>
            <select name="role" required defaultValue="">
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
              name="password"
              placeholder="Create a password"
              minLength={8}
              maxLength={72}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
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
