import Navbar from "../../components/Navbar/Navbar";
import "./PostProblem.css";

function PostProblem() {
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
        <form className="post-problem-form">
          <div className="problem-form-group">
            <label htmlFor="problem-title">Problem Title</label>
            <input
              id="problem-title"
              type="text"
              placeholder="Enter a clear problem title"
            />
          </div>

          <div className="problem-form-group">
            <label htmlFor="problem-category">Category</label>
            <select id="problem-category" defaultValue="">
              <option value="" disabled>
                Select a category
              </option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Smart City</option>
              <option>Environment</option>
              <option>Agriculture</option>
              <option>Technology</option>
            </select>
          </div>

          <div className="problem-form-group">
            <label htmlFor="problem-description">Problem Description</label>
            <textarea
              id="problem-description"
              rows="7"
              placeholder="Explain the problem, its impact, and why it needs a solution..."
            />
          </div>

          <div className="problem-form-group">
            <label htmlFor="problem-requirements">Key Requirements</label>
            <textarea
              id="problem-requirements"
              rows="5"
              placeholder="Mention important requirements or expected features..."
            />
          </div>

          <div className="problem-form-group">
            <label htmlFor="problem-outcome">Expected Outcome</label>
            <textarea
              id="problem-outcome"
              rows="4"
              placeholder="Describe the expected solution or outcome..."
            />
          </div>

          <div className="post-problem-actions">
            <button type="button" className="problem-cancel-button">
              Cancel
            </button>

            <button type="submit" className="problem-submit-button">
              Post Problem
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default PostProblem;