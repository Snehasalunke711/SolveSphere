import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getSolverDashboard } from "../../services/dashboardService";
import "./Dashboard.css";

const fallbackDashboard = {
  stats: {
    explored: 12,
    active: 3,
    submitted: 5,
  },
  activeProblems: [
    {
      id: 1,
      category: "SMART CITY",
      title: "Improve Urban Waste Collection Efficiency",
      description:
        "Build a smarter system to monitor waste collection and optimize collection routes.",
      status: "In Progress",
    },
    {
      id: 2,
      category: "HEALTHCARE",
      title: "Improve Emergency Resource Discovery",
      description:
        "Design a platform that helps users quickly discover nearby emergency resources.",
      status: "Research",
    },
  ],
};

function Dashboard() {
  const [dashboard, setDashboard] = useState(fallbackDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getSolverDashboard();

        if (data) {
          setDashboard(data);
        }

        setError("");
      } catch (err) {
        console.error(err);

        setError(
          "Backend not connected yet. Showing sample dashboard."
        );

        setDashboard(fallbackDashboard);
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

        <Link
          to="/explore"
          className="dashboard-explore-button"
        >
          Explore Problems
        </Link>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}

          <section className="dashboard-stats">
            <div className="stat-card">
              <span>Problems Explored</span>
              <h2>{dashboard.stats.explored}</h2>
              <p>Challenges viewed</p>
            </div>

            <div className="stat-card">
              <span>Active Solutions</span>
              <h2>{dashboard.stats.active}</h2>
              <p>Currently in progress</p>
            </div>

            <div className="stat-card">
              <span>Submitted</span>
              <h2>{dashboard.stats.submitted}</h2>
              <p>Solutions completed</p>
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
                  <h2>No Active Problems</h2>

                  <p>
                    Explore problems and start solving your first challenge.
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
                  <div
                    className="problem-card"
                    key={problem.id}
                  >
                    <span className="problem-category">
                      {problem.category}
                    </span>

                    <h3>{problem.title}</h3>

                    <p>{problem.description}</p>

                    <div className="problem-card-footer">
                      <span>{problem.status}</span>

                      <Link to={`/problem/${problem.id}`}>
                        Continue Solving
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Dashboard;