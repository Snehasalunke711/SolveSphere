
import "../Login/Login.css";
import { Link, useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    const password = e.target.password.value;

    const users = JSON.parse(
      localStorage.getItem("solvesphere_users") || "[]"
    );

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = {
      name,
      email,
      role,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "solvesphere_users",
      JSON.stringify(users)
    );

    alert("Account created successfully! Please sign in.");

    navigate("/login");
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
