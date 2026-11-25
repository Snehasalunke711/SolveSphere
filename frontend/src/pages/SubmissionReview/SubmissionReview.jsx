
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  getSolutionById,
  reviewSolution,
} from "../../services/solutionService";
import "./SubmissionReview.css";

function SubmissionReview() {
  const { id } = useParams();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const loadSubmission = async () => {
      try {
        const data = await getSolutionById(id);
        setSubmission(data);
        setError("");
      } catch (err) {
        console.error("Failed to load submission:", err);
        setError(err.message || "Unable to load this submission.");
      } finally {
        setLoading(false);
      }
    };

    loadSubmission();
  }, [id]);

  const handleReview = async (status) => {
    try {
      setReviewLoading(true);
      setError("");

      const updatedSubmission = await reviewSolution(id, status);

      setSubmission(updatedSubmission);
    } catch (err) {
      console.error("Failed to review submission:", err);
      setError(err.message || "Unable to update submission status.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="submission-review-page">
        <Navbar />
        <Loading />
      </main>
    );
  }

  if (!submission) {
    return (
      <main className="submission-review-page">
        <Navbar />

        <section className="submission-review-content">
          <ErrorMessage message={error || "Submission not found."} />

          <Link to="/owner-dashboard" className="review-back-link">
            ← Back to Dashboard
          </Link>
        </section>
      </main>
    );
  }

  const isSelected = submission.status === "SELECTED";

  return (
    <main className="submission-review-page">
      <Navbar />

      <section className="submission-review-header">
        <Link
          to={`/submissions/${submission.problemId}`}
          className="review-back-link"
        >
          ← Back to Submissions
        </Link>

        <span>SUBMISSION REVIEW</span>

        <h1>{submission.solutionTitle}</h1>

        <p>
          Review the submitted solution, technical approach,
          and project information.
        </p>
      </section>

      {error && <ErrorMessage message={error} />}

      <section className="submission-review-content">
        <div className="review-main-content">
          <div className="review-card">
            <span className="review-label">
              SOLUTION OVERVIEW
            </span>

            <h2>About the Solution</h2>

            <p>{submission.solutionDescription}</p>
          </div>

          <div className="review-card">
            <span className="review-label">
              TECHNOLOGY STACK
            </span>

            <h2>Technologies Used</h2>

            <p>{submission.techStack || "Not provided"}</p>
          </div>

          <div className="review-card">
            <span className="review-label">
              ADDITIONAL NOTES
            </span>

            <h2>More Information</h2>

            <p>{submission.additionalNotes || "No additional notes provided."}</p>
          </div>

          <div className="review-card">
            <span className="review-label">
              PROJECT RESOURCES
            </span>

            <h2>Explore the Project</h2>

            <p>
              GitHub Repository:{" "}
              {submission.githubUrl ? (
                <a href={submission.githubUrl} target="_blank" rel="noreferrer">
                  View Repository
                </a>
              ) : (
                "Not provided"
              )}
            </p>

            <p>
              Demo Link:{" "}
              {submission.demoUrl ? (
                <a href={submission.demoUrl} target="_blank" rel="noreferrer">
                  View Demo
                </a>
              ) : (
                "Not provided"
              )}
            </p>
          </div>
        </div>

        <aside className="review-sidebar">
          <span>SUBMITTED BY</span>

          <h3>{submission.submittedByName}</h3>

          <p>
            Problem: {submission.problemTitle}
          </p>

          <p>
            Current Status: <strong>{submission.status}</strong>
          </p>

          {isSelected ? (
            <p className="review-status-message">
              This solution has been selected as the best solution.
            </p>
          ) : (
            <>
              <button
                className="approve-button"
                onClick={() => handleReview("ACCEPTED")}
                disabled={reviewLoading}
              >
                {reviewLoading ? "Updating..." : "Accept Solution"}
              </button>

              <button
                className="reject-button"
                onClick={() => handleReview("REJECTED")}
                disabled={reviewLoading}
              >
                Reject Solution
              </button>

              <button
                className="approve-button"
                onClick={() => handleReview("SELECTED")}
                disabled={reviewLoading}
              >
                Select as Best Solution
              </button>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}

export default SubmissionReview;
