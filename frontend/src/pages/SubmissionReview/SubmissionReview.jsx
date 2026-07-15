import { useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./SubmissionReview.css";

const submissions = {
  1: {
    title: "Smart Waste Route Optimizer",
    solver: "Aarav Sharma",
    tech: "React · FastAPI · Python · ML",
    description:
      "A data-driven waste monitoring and route optimization platform designed to improve urban waste collection efficiency.",
    approach:
      "The solution monitors waste collection requirements and uses machine learning to identify efficient collection routes.",
    repository: "GitHub Repository Submitted",
  },
  2: {
    title: "EcoRoute AI",
    solver: "Meera Patel",
    tech: "React · Flask · Python · OpenStreetMap",
    description:
      "An intelligent route planning system for efficient waste collection.",
    approach:
      "The platform combines location data with route planning techniques to reduce unnecessary travel.",
    repository: "GitHub Repository Submitted",
  },
  3: {
    title: "CleanCity Monitor",
    solver: "Rahul Verma",
    tech: "Flutter · Firebase · Python",
    description:
      "A smart monitoring application for tracking urban waste collection.",
    approach:
      "The mobile application tracks waste collection activity and provides monitoring information.",
    repository: "GitHub Repository Submitted",
  },
};

function SubmissionReview() {
  const { id } = useParams();

  const submission = submissions[id] || submissions[1];
  const [reviewStatus, setReviewStatus] = useState("");

  return (
    <main className="submission-review-page">
      <Navbar />

      <section className="submission-review-header">
        <Link to="/owner-dashboard" className="review-back-link">
          ← Back to Dashboard
        </Link>

        <span>SUBMISSION REVIEW</span>

        <h1>{submission.title}</h1>

        <p>
          Review the submitted solution, technical approach, and project
          information.
        </p>
      </section>

      <section className="submission-review-content">
        <div className="review-main-content">
          <div className="review-card">
            <span className="review-label">SOLUTION OVERVIEW</span>

            <h2>About the Solution</h2>

            <p>{submission.description}</p>
          </div>

          <div className="review-card">
            <span className="review-label">SOLUTION APPROACH</span>

            <h2>How does it solve the problem?</h2>

            <p>{submission.approach}</p>
          </div>

          <div className="review-card">
            <span className="review-label">TECHNOLOGY STACK</span>

            <h2>Technologies Used</h2>

            <p>{submission.tech}</p>
          </div>
        </div>

        <aside className="review-sidebar">
          <span>SUBMITTED BY</span>

          <h3>{submission.solver}</h3>

          <p>{submission.repository}</p>

          <button
  className="approve-button"
  onClick={() => setReviewStatus("approved")}
>
  Approve Solution
</button>

<button
  className="reject-button"
  onClick={() => setReviewStatus("changes")}
>
  Request Changes
</button>

{reviewStatus === "approved" && (
  <p className="review-status-message">
    Solution approved successfully.
  </p>
)}

{reviewStatus === "changes" && (
  <p className="review-status-message">
    Change request has been recorded.
  </p>
)}
        </aside>
      </section>
    </main>
  );
}

export default SubmissionReview;