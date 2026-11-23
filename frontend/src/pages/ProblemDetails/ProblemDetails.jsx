
import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getProblemById } from "../../services/problemService";
import "./ProblemDetails.css";

function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary demo participation data
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: "Aarav Sharma" },
    { id: 2, name: "Priya Nair" },
    { id: 3, name: "Rahul Kumar" },
  ]);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        const data = await getProblemById(id);
        setProblem(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load problem.");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  const handleJoin = () => {
    setJoined(true);
    setParticipants((prev) => [
      ...prev,
      { id: "demo-user", name: "Demo Solver" },
    ]);
  };

  const handleLeave = () => {
    setJoined(false);
    setParticipants((prev) =>
      prev.filter((person) => person.id !== "demo-user")
    );
  };

  const handleStartSolving = () => {
    if (!joined) {
      alert("Please join this problem before starting to solve it.");
      return;
    }

    navigate(`/submit-solution/${id}`);
  };

  if (loading) {
    return (
      <main className="problem-details-page">
        <Navbar />
        <section className="problem-details-header">
          <h2>Loading problem...</h2>
        </section>
      </main>
    );
  }

  if (error || !problem) {
    return (
      <main className="problem-details-page">
        <Navbar />
        <section className="problem-details-header">
          <Link to="/explore" className="back-link">
            ← Back to Problems
          </Link>
          <h1>Problem Not Found</h1>
          <p>{error || "The requested problem does not exist."}</p>
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
            <span className="details-label">PROBLEM OBJECTIVE</span>
            <h2>{problem.objective}</h2>
          </div>

          <div className="details-card">
            <span className="details-label">EXPECTED OUTCOME</span>
            <h2>What should the solution achieve?</h2>
            <ul>
              <li>Understand the core problem and user requirements.</li>
              <li>Design a practical and scalable solution approach.</li>
              <li>Select suitable technologies and development tools.</li>
              <li>Build and explain a working solution or prototype.</li>
            </ul>
          </div>

          {/* Participants section */}
          <div className="details-card participants-card">
            <span className="details-label">PROBLEM PARTICIPANTS</span>

            <h2>
              {participants.length} Participants
            </h2>

            <p>Students who have joined this challenge.</p>

            <div className="participants-list">
              {participants.map((person) => (
                <div className="participant-item" key={person.id}>
                  <div className="participant-avatar">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{person.name}</span>
                  {person.id === "demo-user" && (
                    <span className="you-label">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="problem-action-card">
          <span>READY TO SOLVE?</span>

          <h3>
            {joined ? "You're part of this challenge!" : "Join this challenge"}
          </h3>

          <p>
            {joined
              ? "You're now participating in this problem. Explore AI guidance and start building your solution."
              : "Join this problem to participate, get AI-powered guidance, and submit your solution."}
          </p>

          {!joined ? (
            <button
              className="join-problem-button"
              onClick={handleJoin}
            >
              Join Problem
            </button>
          ) : (
            <button
              className="leave-problem-button"
              onClick={handleLeave}
            >
              Leave Problem
            </button>
          )}

          <Link
            to={`/ai-suggestions?problem=${id}`}
            className="ai-guide-button"
          >
            Get AI Suggestions
          </Link>

          <button
            className={`start-solution-button ${!joined ? "locked" : ""}`}
            onClick={handleStartSolving}
          >
            {joined ? "Start Solving" : "Join to Start Solving"}
          </button>

          {!joined && (
            <p className="join-required-message">
              Join the problem before submitting a solution.
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}

export default ProblemDetails;
