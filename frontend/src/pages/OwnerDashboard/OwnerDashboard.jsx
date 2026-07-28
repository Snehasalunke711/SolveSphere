import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getOwnerProblems } from "../../services/problemService";
import "./OwnerDashboard.css";

const fallbackProblems = [
  {
    id: 1,
    title: "Improve Urban Waste Collection Efficiency",
    category: "Smart City",
    submissions: 12,
    status: "Active",
  },
  {
    id: 2,
    title: "Improve Emergency Resource Discovery",
    category: "Healthcare",
    submissions: 8,
    status: "Active",
  },
  {
    id: 3,
    title: "Personalized Learning Resource Discovery",
    category: "Education",
    submissions: 5,
    status: "Reviewing",
  },
];

function OwnerDashboard() {
  const [problems, setProblems] = useState(fallbackProblems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await getOwnerProblems();

        if (data) {
          setProblems(data);
        }

        setError("");
      } catch (err) {
        console.error(err);

        setError(
          "Backend not connected yet. Showing sample dashboard."
        );

        setProblems(fallbackProblems);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const totalProblems = problems.length;

  const totalSubmissions = problems.reduce(
    (total, problem) => total + (problem.submissions || 0),
    0
  );

  const activeProblems = problems.filter(
    (problem) => problem.status === "Active"
  ).length;

  return (
    <main className="owner-dashboard-page">
      <Navbar />

      <section className="owner-dashboard-header">
        <div>
          <span>PROBLEM OWNER DASHBOARD</span>

          <h1>Manage Your Challenges</h1>

          <p>
            Track problems, review submissions, and discover promising
            solutions.
          </p>
        </div>

        <Link
          to="/post-problem"
          className="post-problem-button"
        >
          + Post New Problem
        </Link>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <section className="owner-dashboard-content">
          {error && <ErrorMessage message={error} />}

          <div className="owner-stats">
            <div className="owner-stat-card">
              <span>Total Problems</span>
              <strong>{totalProblems}</strong>
            </div>

            <div className="owner-stat-card">
              <span>Total Submissions</span>
              <strong>{totalSubmissions}</strong>
            </div>

            <div className="owner-stat-card">
              <span>Active Problems</span>
              <strong>{activeProblems}</strong>
            </div>
          </div>

          <div className="owner-problems-section">
            <div className="owner-section-heading">
              <h2>Your Problems</h2>

              <p>
                Manage challenges and review submitted solutions.
              </p>
            </div>

            <div className="owner-problems-list">
              {problems.length === 0 ? (
                <div className="empty-state">
                  <h2>No Problems Posted</h2>

                  <p>
                    Post your first challenge and start receiving innovative
                    solutions.
                  </p>

                  <Link
                    to="/post-problem"
                    className="post-problem-button"
                  >
                    + Post Your First Problem
                  </Link>
                </div>
              ) : (
                problems.map((problem) => (
                  <article
                    key={problem.id}
                    className="owner-problem-card"
                  >
                    <div>
                      <span className="owner-problem-category">
                        {problem.category}
                      </span>

                      <h3>{problem.title}</h3>

                      <p>
                        {problem.submissions} solutions submitted
                      </p>
                    </div>

                    <div className="owner-problem-actions">
                      <span className="owner-status">
                        {problem.status}
                      </span>

                      <Link to={`/submissions/${problem.id}`}>
                        View Submissions
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default OwnerDashboard;