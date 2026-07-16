import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import { submitSolution } from "../../services/submissionService";
import "./SubmitSolution.css";

function SubmitSolution() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    demo_link: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await submitSolution(id, formData);

      alert("Solution submitted successfully!");

      navigate(`/problem/${id}`);
    } catch (error) {
      console.error(error);

      alert("Backend not connected. Running in demo mode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="submit-solution-page">
      <Navbar />

      <section className="submit-header">
        <Link to={`/problem/${id}`} className="submit-back-link">
          ← Back to Problem
        </Link>

        <span>SUBMIT YOUR SOLUTION</span>

        <h1>Show What You've Built</h1>

        <p>
          Share your solution, explain your approach, and provide the resources
          needed to review your work.
        </p>
      </section>

      <section className="submit-content">
        <form className="solution-form" onSubmit={handleSubmit}>

          <div className="solution-form-group">
            <label>Project Title</label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your project title"
              required
            />
          </div>

          <div className="solution-form-group">
            <label>Solution Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Explain your solution"
              required
            />
          </div>

          <div className="solution-form-group">
            <label>Technology Stack</label>

            <input
              name="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              placeholder="React, FastAPI, Python..."
              required
            />
          </div>

          <div className="solution-form-row">

            <div className="solution-form-group">
              <label>GitHub Repository</label>

              <input
                type="url"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                placeholder="GitHub Repository URL"
                required
              />
            </div>

            <div className="solution-form-group">
              <label>Demo Link</label>

              <input
                type="url"
                name="demo_link"
                value={formData.demo_link}
                onChange={handleChange}
                placeholder="Demo URL"
              />
            </div>

          </div>

          <div className="solution-form-group">
            <label>Additional Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any additional notes"
            />
          </div>

          <div className="submit-form-actions">

            <Link
              to={`/problem/${id}`}
              className="cancel-submit-button"
            >
              Cancel
            </Link>

            <button
              className="submit-solution-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Solution"}
            </button>

          </div>

        </form>

        <aside className="submission-guide">
          <span>SUBMISSION GUIDE</span>

          <h2>Before you submit</h2>

          <ul>
            <li>Clearly explain your solution approach.</li>
            <li>Provide a working GitHub repository.</li>
            <li>Mention the technologies used.</li>
            <li>Add a demo link if available.</li>
            <li>Review your project details carefully.</li>
          </ul>

          <div className="submission-note">
            <strong>Tip</strong>

            <p>
              A clear explanation helps reviewers understand your solution.
            </p>
          </div>

        </aside>

      </section>
    </main>
  );
}

export default SubmitSolution;