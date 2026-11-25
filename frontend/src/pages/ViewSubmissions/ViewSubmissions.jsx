
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getProblemSubmissions, getProblemById } from "../../services/problemService";
import "./ViewSubmissions.css";

function ViewSubmissions() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [problemData, submissionData] = await Promise.all([
          getProblemById(id),
          getProblemSubmissions(id),
        ]);

        setProblem(problemData);
        setSubmissions(Array.isArray(submissionData) ? submissionData : []);
        setError("");
      } catch (err) {
        console.error("Failed to load problem submissions:", err);
        setError(err.message || "Unable to load problem submissions.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return (
    <main className="view-submissions-page">
      <Navbar />

      <section className="submissions-header">
        <Link to="/owner-dashboard">
          ← Back to Dashboard
        </Link>

        <span>PROBLEM SUBMISSIONS</span>

        <h1>Review Submitted Solutions</h1>

        <p>
          View solutions submitted by contributors and select the ones
          that best solve your problem.
        </p>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <section className="submissions-content">
          {error && <ErrorMessage message={error} />}

          {!error && (
            <>
              <div className="submissions-summary">
                <span>
                  {problem?.title || "Problem details unavailable"}
                </span>

                <strong>
                  {submissions.length} submissions available
                </strong>
              </div>

              {submissions.length === 0 ? (
                <div className="empty-state">
                  <h2>No Submissions Yet</h2>
                  <p>
                    No one has submitted a solution for this problem yet.
                  </p>
                </div>
              ) : (
                <div className="submissions-list">
                  {submissions.map((submission) => (
                    <Link
                      to={`/submission-review/${submission.id}`}
                      className="submission-card"
                      key={submission.id}
                    >
                      <div className="submission-card-content">
                        <h2>
                          {submission.solutionTitle || "Untitled Solution"}
                        </h2>

                        <p>
                          Submitted by{" "}
                          <strong>
                            {submission.submittedByName || "Unknown Contributor"}
                          </strong>
                        </p>
                      </div>

                      <span className="submission-card-arrow">
                        View Submission →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default ViewSubmissions;
