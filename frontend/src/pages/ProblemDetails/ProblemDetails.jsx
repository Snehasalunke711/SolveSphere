
import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import {
  getProblemById,
  getProblemParticipants,
  joinProblem,
  leaveProblem,
} from "../../services/problemService";
import { getMySubmissions } from "../../services/submissionService";
import "./ProblemDetails.css";

function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [problem, setProblem] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [joined, setJoined] = useState(false);
  const [mySubmission, setMySubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError("");

        const [problemData, participantData, submissionsData] =
          await Promise.all([
            getProblemById(id),
            getProblemParticipants(id),
            getMySubmissions(),
          ]);

        setProblem(problemData);
        setParticipants(participantData);

        const hasJoined = participantData.some(
          (person) => String(person.userId) === String(user?.id)
        );

        setJoined(hasJoined);

        const existingSubmission = submissionsData.find(
          (submission) => String(submission.problemId) === String(id)
        );

        setMySubmission(existingSubmission || null);
      } catch (err) {
        console.error("Unable to load problem:", err);
        setError(err.message || "Unable to load problem.");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id, user?.id]);

  const handleJoin = async () => {
    try {
      setActionLoading(true);
      setActionError("");

      const newParticipant = await joinProblem(id);

      setParticipants((prev) => [...prev, newParticipant]);
      setJoined(true);
    } catch (err) {
      console.error("Unable to join problem:", err);
      setActionError(err.message || "Unable to join this problem.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    try {
      setActionLoading(true);
      setActionError("");

      await leaveProblem(id);

      setParticipants((prev) =>
        prev.filter((person) => String(person.userId) !== String(user?.id))
      );

      setJoined(false);
    } catch (err) {
      console.error("Unable to leave problem:", err);
      setActionError(err.message || "Unable to leave this problem.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleStartSolving = () => {
    if (!joined) {
      alert("Please join this problem before starting to solve it.");
      return;
    }

    navigate(`/submit-solution/${id}`);
  };

  const canEditSubmission =
    mySubmission?.status?.toUpperCase() === "PENDING" &&
    problem?.status?.toUpperCase() !== "CLOSED";

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
            <h2>{problem.objective || problem.description}</h2>
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

          <div className="details-card participants-card">
            <span className="details-label">PROBLEM PARTICIPANTS</span>

            <h2>{participants.length} Participants</h2>

            <p>Students who have joined this challenge.</p>

            <div className="participants-list">
              {participants.map((person) => (
                <div className="participant-item" key={person.participationId}>
                  <div className="participant-avatar">
                    {person.userName.charAt(0).toUpperCase()}
                  </div>
                  <span>{person.userName}</span>
                  {String(person.userId) === String(user?.id) && (
                    <span className="you-label">You</span>
                  )}
                </div>
              ))}

              {participants.length === 0 && (
                <p>No participants have joined this challenge yet.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="problem-action-card">
          <span>
            {mySubmission ? "YOUR SUBMISSION" : "READY TO SOLVE?"}
          </span>

          <h3>
            {mySubmission
              ? "You've submitted a solution!"
              : joined
                ? "You're part of this challenge!"
                : "Join this challenge"}
          </h3>

          <p>
            {mySubmission
              ? "Your solution has been submitted. You can check its status below."
              : joined
                ? "You're now participating in this problem. Explore AI guidance and start building your solution."
                : "Join this problem to participate, get AI-powered guidance, and submit your solution."}
          </p>

          {actionError && <p className="error-message">{actionError}</p>}

          {!joined ? (
            <button
              className="join-problem-button"
              onClick={handleJoin}
              disabled={actionLoading || mySubmission !== null}
            >
              {actionLoading ? "Joining..." : "Join Problem"}
            </button>
          ) : (
            <button
              className="leave-problem-button"
              onClick={handleLeave}
              disabled={actionLoading}
            >
              {actionLoading ? "Leaving..." : "Leave Problem"}
            </button>
          )}

          <Link
            to={`/ai-suggestions?problem=${id}`}
            className="ai-guide-button"
          >
            Get AI Suggestions
          </Link>

          {mySubmission ? (
            <>
              <p className="submission-status">
                Status: <strong>{mySubmission.status}</strong>
              </p>

              {canEditSubmission && (
                <button
                  className="start-solution-button"
                  onClick={handleStartSolving}
                >
                  Edit Solution
                </button>
              )}

              {!canEditSubmission && (
                <p className="join-required-message">
                  This submission can no longer be edited.
                </p>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </aside>
      </section>
    </main>
  );
}

export default ProblemDetails;
