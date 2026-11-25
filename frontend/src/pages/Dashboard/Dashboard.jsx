
import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getSolverDashboard } from "../../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getSolverDashboard();
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError(err.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="dashboard-header">
        <div>
          <span className="dashboard-label">
            SOLVER DASHBOARD
          </span>

          <h1>Welcome to your workspace</h1>

          <p>
            Explore real-world challenges, track your progress,
            and continue building meaningful solutions.
          </p>
        </div>

        <Link to="/explore" className="dashboard-explore-button">
          Explore Problems
        </Link>
      </section>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : dashboard ? (
        <>
          <section className="dashboard-stats">
            <div className="stat-card">
              <span>Available Problems</span>
              <h2>{dashboard.stats.explored}</h2>
              <p>Challenges available</p>
            </div>

            <div className="stat-card">
              <span>Active Solutions</span>
              <h2>{dashboard.stats.active}</h2>
              <p>Awaiting review or accepted</p>
            </div>

            <div className="stat-card">
              <span>Total Submissions</span>
              <h2>{dashboard.stats.submitted}</h2>
              <p>Solutions submitted</p>
            </div>
          </section>

          <section className="dashboard-content">
            <div className="dashboard-section-heading">
              <div>
                <span>YOUR WORK</span>
                <h2>Active Problems</h2>
              </div>

              <Link to="/explore">
                View all problems
              </Link>
            </div>

            <div className="active-problems">
              {dashboard.activeProblems.length === 0 ? (
                <div className="empty-state">
                  <h2>No Submitted Solutions Yet</h2>

                  <p>
                    Explore available problems and submit your first solution.
                  </p>

                  <Link
                    to="/explore"
                    className="dashboard-explore-button"
                  >
                    Explore Problems
                  </Link>
                </div>
              ) : (
                dashboard.activeProblems.map((problem) => (
                  <div className="problem-card" key={problem.id}>
                    <span className="problem-category">
                      {problem.category}
                    </span>

                    <h3>{problem.title}</h3>

                    <p>{problem.description}</p>

                    <div className="problem-card-footer">
                      <span>{problem.status}</span>

                      <Link to={`/problem/${problem.id}`}>
                        View Problem
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}

export default Dashboard;
