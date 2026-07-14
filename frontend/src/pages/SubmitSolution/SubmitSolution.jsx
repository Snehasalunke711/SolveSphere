import { Link, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./SubmitSolution.css";

function SubmitSolution() {
  const { id } = useParams();

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
        <form className="solution-form">
          <div className="solution-form-group">
            <label>Project Title</label>
            <input
              type="text"
              placeholder="Enter your project title"
              required
            />
          </div>

          <div className="solution-form-group">
            <label>Solution Description</label>
            <textarea
              placeholder="Explain your solution and how it solves the problem"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="solution-form-group">
            <label>Technology Stack</label>
            <input
              type="text"
              placeholder="Example: React, FastAPI, Python, PostgreSQL"
              required
            />
          </div>

          <div className="solution-form-row">
            <div className="solution-form-group">
              <label>GitHub Repository</label>
              <input
                type="url"
                placeholder="Enter GitHub repository link"
                required
              />
            </div>

            <div className="solution-form-group">
              <label>Demo Link</label>
              <input
                type="url"
                placeholder="Enter live demo link"
              />
            </div>
          </div>

          <div className="solution-form-group">
            <label>Additional Notes</label>
            <textarea
              placeholder="Add implementation details or reviewer notes"
              rows="4"
            ></textarea>
          </div>

          <div className="submit-form-actions">
            <Link to={`/problem/${id}`} className="cancel-submit-button">
              Cancel
            </Link>

            <button type="submit" className="submit-solution-button">
              Submit Solution
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
              A clear explanation helps problem owners understand the value of
              your solution.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default SubmitSolution;