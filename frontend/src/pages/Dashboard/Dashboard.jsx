import { Link } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="dashboard-header">
        <div>
          <span className="dashboard-label">SOLVER DASHBOARD</span>
          <h1>Welcome to your workspace</h1>
          <p>
            Explore real-world challenges, track your progress, and continue
            building meaningful solutions.
          </p>
        </div>

        <Link to="/explore" className="dashboard-explore-button">
          Explore Problems
        </Link>
      </section>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span>Problems Explored</span>
          <h2>12</h2>
          <p>Challenges viewed</p>
        </div>

        <div className="stat-card">
          <span>Active Solutions</span>
          <h2>03</h2>
          <p>Currently in progress</p>
        </div>

        <div className="stat-card">
          <span>Submitted</span>
          <h2>05</h2>
          <p>Solutions completed</p>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-section-heading">
          <div>
            <span>YOUR WORK</span>
            <h2>Active Problems</h2>
          </div>

          <Link to="/explore">View all problems</Link>
        </div>

        <div className="active-problems">
          <div className="problem-card">
            <span className="problem-category">SMART CITY</span>
            <h3>Improve Urban Waste Collection Efficiency</h3>
            <p>
              Build a smarter system to monitor waste collection and optimize
              collection routes.
            </p>

            <div className="problem-card-footer">
              <span>In Progress</span>
              <Link to="/problem/1">Continue Solving</Link>
            </div>
          </div>

          <div className="problem-card">
            <span className="problem-category">HEALTHCARE</span>
            <h3>Improve Emergency Resource Discovery</h3>
            <p>
              Design a platform that helps users quickly discover nearby
              emergency resources.
            </p>

            <div className="problem-card-footer">
              <span>Research</span>
              <Link to="/problem/2">Continue Solving</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;