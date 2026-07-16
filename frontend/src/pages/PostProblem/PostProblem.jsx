import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import { createProblem } from "../../services/problemService";
import "./PostProblem.css";

function PostProblem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    outcome: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createProblem(formData);

      alert("Problem posted successfully!");

      navigate("/owner-dashboard");
    } catch (error) {
      console.error(error);

      // Demo mode if backend is unavailable
      alert("Backend not connected. Running in demo mode.");

      navigate("/owner-dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="post-problem-page">
      <Navbar />

      <section className="post-problem-header">
        <span>POST A PROBLEM</span>

        <h1>Share a Real-World Challenge</h1>

        <p>
          Describe your problem clearly and help talented problem solvers build
          meaningful solutions.
        </p>
      </section>

      <section className="post-problem-content">
        <form className="post-problem-form" onSubmit={handleSubmit}>
          <div className="problem-form-group">
            <label htmlFor="title">Problem Title</label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter problem title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="problem-form-group">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Smart City">Smart City</option>
              <option value="Environment">Environment</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="problem-form-group">
            <label htmlFor="description">Problem Description</label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe the problem..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="problem-form-group">
            <label htmlFor="requirements">Requirements</label>

            <textarea
              id="requirements"
              name="requirements"
              rows="5"
              placeholder="Mention key requirements..."
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>

          <div className="problem-form-group">
            <label htmlFor="outcome">Expected Outcome</label>

            <textarea
              id="outcome"
              name="outcome"
              rows="4"
              placeholder="Describe the expected outcome..."
              value={formData.outcome}
              onChange={handleChange}
            />
          </div>

          <div className="post-problem-actions">
            <button
              type="button"
              className="problem-cancel-button"
              onClick={() => navigate("/owner-dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="problem-submit-button"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Problem"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default PostProblem;