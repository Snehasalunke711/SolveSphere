
import "./Login.css";
import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const users = JSON.parse(
      localStorage.getItem("solvesphere_users") || "[]"
    );

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    const currentUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    localStorage.setItem(
      "solvesphere_current_user",
      JSON.stringify(currentUser)
    );

    alert("Login successful!");

    if (user.role === "solver") {
      navigate("/dashboard");
    } else if (user.role === "owner") {
      navigate("/owner-dashboard");
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
          Sign in to continue exploring problems and building solutions.
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

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="auth-button">
            Sign In
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
