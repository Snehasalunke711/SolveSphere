
import "./Login.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      const currentUser = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
      };

      login(currentUser, response.token);

      alert("Login successful!");

      if (response.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed. Please check your credentials.");
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

        <h1>Welcome back</h1>

        <p className="auth-description">
          Sign in to continue your SolveSphere journey.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
