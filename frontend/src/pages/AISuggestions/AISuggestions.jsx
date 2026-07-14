import { Link, useSearchParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./AISuggestions.css";

function AISuggestions() {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problem") || "1";

  return (
    <main className="ai-suggestions-page">
      <Navbar />

      <section className="suggestions-header">
        <Link to={`/problem/${problemId}`} className="suggestions-back-link">
          ← Back to Problem
        </Link>

        <span className="suggestions-label">AI-POWERED GUIDANCE</span>

        <h1>Build Your Solution Smarter</h1>

        <p>
          Explore AI-generated guidance to understand the challenge, discover
          possible approaches, and select suitable technologies.
        </p>
      </section>

      <section className="suggestions-content">
        <div className="suggestion-card">
          <div className="suggestion-number">01</div>

          <div>
            <span>PROBLEM UNDERSTANDING</span>
            <h2>Understand the Core Challenge</h2>
            <p>
              The main challenge is to improve the efficiency of the existing
              process by identifying real-time needs and reducing unnecessary
              resource usage.
            </p>
          </div>
        </div>

        <div className="suggestion-card">
          <div className="suggestion-number">02</div>

          <div>
            <span>SUGGESTED APPROACH</span>
            <h2>Build a Data-Driven Monitoring System</h2>
            <p>
              Collect relevant information, analyze current conditions, and use
              the results to support smarter decisions and optimized actions.
            </p>
          </div>
        </div>

        <div className="suggestion-card">
          <div className="suggestion-number">03</div>

          <div>
            <span>RECOMMENDED TECHNOLOGIES</span>
            <h2>Suggested Technology Stack</h2>

            <div className="technology-list">
              <span>React</span>
              <span>FastAPI</span>
              <span>Python</span>
              <span>Machine Learning</span>
              <span>PostgreSQL</span>
            </div>
          </div>
        </div>

        <div className="suggestion-card">
          <div className="suggestion-number">04</div>

          <div>
            <span>DEVELOPMENT ROADMAP</span>
            <h2>Suggested Implementation Steps</h2>

            <ol className="roadmap-list">
              <li>Understand the users and core requirements.</li>
              <li>Collect or prepare the required data.</li>
              <li>Design the application architecture.</li>
              <li>Build the core solution features.</li>
              <li>Test the prototype and improve the solution.</li>
            </ol>
          </div>
        </div>

        <div className="suggestions-action">
          <div>
            <h2>Ready to start building?</h2>
            <p>Use this guidance as a starting point for your solution.</p>
          </div>

          <Link
            to={`/submit-solution/${problemId}`}
            className="suggestions-start-button"
          >
            Start Solving
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AISuggestions;