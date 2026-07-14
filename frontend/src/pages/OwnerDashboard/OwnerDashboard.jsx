import { Link } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./OwnerDashboard.css";

const ownerProblems = [
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

        <button className="post-problem-button">+ Post New Problem</button>
      </section>

      <section className="owner-dashboard-content">
        <div className="owner-stats">
          <div className="owner-stat-card">
            <span>Total Problems</span>
            <strong>3</strong>
          </div>

          <div className="owner-stat-card">
            <span>Total Submissions</span>
            <strong>25</strong>
          </div>

          <div className="owner-stat-card">
            <span>Active Problems</span>
            <strong>2</strong>
          </div>
        </div>

        <div className="owner-problems-section">
          <div className="owner-section-heading">
            <h2>Your Problems</h2>
            <p>Manage challenges and review submitted solutions.</p>
          </div>

          <div className="owner-problems-list">
            {ownerProblems.map((problem) => (
              <article className="owner-problem-card" key={problem.id}>
                <div>
                  <span className="owner-problem-category">
                    {problem.category}
                  </span>

                  <h3>{problem.title}</h3>

                  <p>{problem.submissions} solutions submitted</p>
                </div>

                <div className="owner-problem-actions">
                  <span className="owner-status">{problem.status}</span>

                  <Link to={`/submissions/${problem.id}`}>
                    View Submissions
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default OwnerDashboard;