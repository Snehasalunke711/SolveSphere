import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getProblemById } from "../../services/problemService";
import "./ProblemDetails.css";

function ProblemDetails() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);

        const data = await getProblemById(id);

        setProblem(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load problem.");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  if (loading) {
    return (
      <main className="problem-details-page">
        <Navbar />
        <section className="problem-details-header">
          <h2>Loading problem...</h2>
        </section>
      </main>
    );
  }

  if (error || !problem) {
    return (
      <main className="problem-details-page">
        <Navbar />

        <section className="problem-details-header">
          <Link to="/explore" className="back-link">
            ← Back to Problems
          </Link>

          <h1>Problem Not Found</h1>

          <p>{error || "The requested problem does not exist."}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="problem-details-page">
      <Navbar />

      <section className="problem-details-header">
        <Link to="/explore" className="back-link">
          ← Back to Problems
        </Link>

        <div className="problem-meta">
          <span>{problem.category}</span>
          <span>{problem.difficulty}</span>
        </div>

        <h1>{problem.title}</h1>

        <p>{problem.description}</p>
      </section>

      <section className="problem-details-content">
        <div className="problem-main-content">
          <div className="details-card">
            <span className="details-label">
              PROBLEM OBJECTIVE
            </span>

            <h2>What needs to be solved?</h2>

            <p>{problem.objective}</p>
          </div>

          <div className="details-card">
            <span className="details-label">
              EXPECTED OUTCOME
            </span>

            <h2>What should the solution achieve?</h2>

            <ul>
              <li>Understand the core problem and user requirements.</li>
              <li>Design a practical and scalable solution approach.</li>
              <li>Select suitable technologies and development tools.</li>
              <li>Build and explain a working solution or prototype.</li>
            </ul>
          </div>
        </div>

        <aside className="problem-action-card">
          <span>READY TO SOLVE?</span>

          <h3>Start building your solution</h3>

          <p>
            Use AI-powered guidance to understand the challenge and discover
            useful approaches.
          </p>

          <Link
            to={`/ai-suggestions?problem=${id}`}
            className="ai-guide-button"
          >
            Get AI Suggestions
          </Link>

          <Link
            to={`/submit-solution/${id}`}
            className="start-solution-button"
          >
            Start Solving
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default ProblemDetails;