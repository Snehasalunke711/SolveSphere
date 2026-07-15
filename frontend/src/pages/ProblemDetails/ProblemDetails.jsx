import { Link, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./ProblemDetails.css";

const problems = {
  1: {
    category: "SMART CITY",
    difficulty: "Intermediate",
    title: "Improve Urban Waste Collection Efficiency",
    description:
      "Urban waste collection systems often follow fixed schedules and routes, leading to inefficient collection, overflowing bins, and unnecessary fuel consumption.",
    objective:
      "Build a smarter solution that can monitor waste collection needs and help optimize collection routes.",
  },

  2: {
    category: "HEALTHCARE",
    difficulty: "Advanced",
    title: "Improve Emergency Resource Discovery",
    description:
      "During emergencies, users may struggle to quickly discover nearby hospitals, ambulances, police stations, and other critical resources.",
    objective:
      "Design a platform that improves emergency resource discovery using location-based information.",
  },

  3: {
    category: "EDUCATION",
    difficulty: "Beginner",
    title: "Personalized Learning Resource Discovery",
    description:
      "Students often struggle to discover learning resources that match their individual needs, interests, and current skill levels.",
    objective:
      "Create a solution that recommends useful learning resources based on student needs and learning preferences.",
  },

  4: {
    category: "ENVIRONMENT",
    difficulty: "Intermediate",
    title: "Monitor Urban Air Quality",
    description:
      "Urban areas experience changing air quality levels, but citizens may not have easy access to understandable pollution information.",
    objective:
      "Develop a system that analyzes air quality information and helps identify pollution patterns.",
  },

  5: {
    category: "AGRICULTURE",
    difficulty: "Advanced",
    title: "Smart Crop Monitoring",
    description:
      "Farmers may struggle to identify early signs of crop stress, disease, and environmental changes affecting crop health.",
    objective:
      "Build a smart monitoring solution that helps farmers understand crop conditions and identify early signs of crop stress.",
  },

  6: {
    category: "TRANSPORT",
    difficulty: "Intermediate",
    title: "Reduce Traffic Congestion",
    description:
      "Growing urban traffic creates longer travel times, increased fuel consumption, and inefficient road usage.",
    objective:
      "Build a data-driven solution that analyzes traffic patterns and helps improve urban mobility.",
  },
};

function ProblemDetails() {
  const { id } = useParams();

  const problem = problems[id];

  if (!problem) {
    return (
      <main className="problem-details-page">
        <Navbar />

        <section className="problem-details-header">
          <Link to="/explore" className="back-link">
            ← Back to Problems
          </Link>

          <h1>Problem Not Found</h1>

          <p>
            The problem you are looking for does not exist.
          </p>
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
              <li>
                Understand the core problem and user requirements.
              </li>

              <li>
                Design a practical and scalable solution approach.
              </li>

              <li>
                Select suitable technologies and development tools.
              </li>

              <li>
                Build and explain a working solution or prototype.
              </li>
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