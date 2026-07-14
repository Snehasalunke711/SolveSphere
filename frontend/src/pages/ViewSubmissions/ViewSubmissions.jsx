import { Link, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./ViewSubmissions.css";

const submissions = [
  {
    id: 1,
    title: "Smart Waste Route Optimizer",
    solver: "Aarav Sharma",
    tech: "React · FastAPI · Python · ML",
    description:
      "A data-driven waste monitoring and route optimization platform.",
  },
  {
    id: 2,
    title: "EcoRoute AI",
    solver: "Meera Patel",
    tech: "React · Flask · Python · OpenStreetMap",
    description:
      "An intelligent route planning system for efficient waste collection.",
  },
  {
    id: 3,
    title: "CleanCity Monitor",
    solver: "Rahul Verma",
    tech: "Flutter · Firebase · Python",
    description:
      "A smart monitoring application for tracking urban waste collection.",
  },
];

function ViewSubmissions() {
  const { id } = useParams();

  return (
    <main className="view-submissions-page">
      <Navbar />

      <section className="submissions-header">
        <Link to="/owner-dashboard">← Back to Dashboard</Link>

        <span>PROBLEM SUBMISSIONS</span>

        <h1>Review Submitted Solutions</h1>

        <p>
          Explore solutions submitted by problem solvers and discover promising
          approaches.
        </p>
      </section>

      <section className="submissions-content">
        <div className="submissions-summary">
          <span>Problem #{id}</span>
          <strong>{submissions.length} submissions available</strong>
        </div>

        <div className="submissions-list">
          {submissions.map((submission) => (
            <article className="submission-card" key={submission.id}>
              <div className="submission-card-content">
                <span>SOLUTION #{submission.id}</span>

                <h2>{submission.title}</h2>

                <p>{submission.description}</p>

                <div className="submission-meta">
                  <span>By {submission.solver}</span>
                  <span>{submission.tech}</span>
                </div>
              </div>

              <button className="review-submission-button">
                Review Solution
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ViewSubmissions;