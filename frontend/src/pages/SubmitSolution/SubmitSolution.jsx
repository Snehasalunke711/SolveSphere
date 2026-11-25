
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import {
  submitSolution,
  updateSolution,
  getMySubmissions,
} from "../../services/submissionService";
import "./SubmitSolution.css";

function SubmitSolution() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    demo_link: "",
    notes: "",
  });

  const [existingSubmission, setExistingSubmission] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExistingSubmission = async () => {
      try {
        setPageLoading(true);
        setError("");

        const submissions = await getMySubmissions();

        const existing = submissions.find(
          (submission) => String(submission.problemId) === String(id)
        );

        if (existing) {
          setExistingSubmission(existing);

          setFormData({
            title: existing.solutionTitle || "",
            description: existing.solutionDescription || "",
            tech_stack: existing.techStack || "",
            github_link: existing.githubUrl || "",
            demo_link: existing.demoUrl || "",
            notes: existing.additionalNotes || "",
          });

          if (
            existing.status?.toUpperCase() !== "PENDING"
          ) {
            setError(
              "This submission has already been reviewed and cannot be edited."
            );
          }
        }
      } catch (err) {
        console.error("Unable to load existing submission:", err);
        setError(err.message || "Unable to load your submission.");
      } finally {
        setPageLoading(false);
      }
    };

    loadExistingSubmission();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingSubmission && existingSubmission.status?.toUpperCase() !== "PENDING") {
      alert("This submission has already been reviewed and cannot be edited.");
      return;
    }

    setLoading(true);

    const solutionData = {
      solutionTitle: formData.title,
      solutionDescription: formData.description,
      techStack: formData.tech_stack,
      githubUrl: formData.github_link,
      demoUrl: formData.demo_link,
      additionalNotes: formData.notes,
    };

    try {
      if (existingSubmission) {
        await updateSolution(existingSubmission.id, solutionData);
        alert("Solution updated successfully!");
      } else {
        await submitSolution(id, solutionData);
        alert("Solution submitted successfully!");
      }

      navigate(`/problem/${id}`);
    } catch (error) {
      console.error("Solution submission failed:", error);
      alert(error.message || "Unable to save your solution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="submit-solution-page">
        <Navbar />
        <section className="submit-header">
          <h2>Loading your submission...</h2>
        </section>
      </main>
    );
  }

  const reviewedSubmission =
    existingSubmission &&
    existingSubmission.status?.toUpperCase() !== "PENDING";

  return (
    <main className="submit-solution-page">
      <Navbar />

      <section className="submit-header">
        <Link to={`/problem/${id}`} className="submit-back-link">
          ← Back to Problem
        </Link>

        <span>
          {existingSubmission ? "EDIT YOUR SOLUTION" : "SUBMIT YOUR SOLUTION"}
        </span>

        <h1>
          {existingSubmission
            ? "Update Your Work"
            : "Show What You've Built"}
        </h1>

        <p>
          Share your solution, explain your approach, and provide the resources
          needed to review your work.
        </p>
      </section>

      <section className="submit-content">
        <form className="solution-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          {reviewedSubmission ? (
            <p className="submission-status">
              Current status: <strong>{existingSubmission.status}</strong>
            </p>
          ) : (
            <>
              <div className="solution-form-group">
                <label>Project Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your project title"
                  required
                />
              </div>

              <div className="solution-form-group">
                <label>Solution Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Explain your solution"
                  required
                />
              </div>

              <div className="solution-form-group">
                <label>Technology Stack</label>
                <input
                  name="tech_stack"
                  value={formData.tech_stack}
                  onChange={handleChange}
                  placeholder="React, Spring Boot, MySQL..."
                  required
                />
              </div>

              <div className="solution-form-row">
                <div className="solution-form-group">
                  <label>GitHub Repository</label>
                  <input
                    type="url"
                    name="github_link"
                    value={formData.github_link}
                    onChange={handleChange}
                    placeholder="GitHub Repository URL"
                    required
                  />
                </div>

                <div className="solution-form-group">
                  <label>Demo Link</label>
                  <input
                    type="url"
                    name="demo_link"
                    value={formData.demo_link}
                    onChange={handleChange}
                    placeholder="Demo URL"
                  />
                </div>
              </div>

              <div className="solution-form-group">
                <label>Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any additional notes"
                />
              </div>

              <div className="submit-form-actions">
                <Link to={`/problem/${id}`} className="cancel-submit-button">
                  Cancel
                </Link>

                <button
                  className="submit-solution-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? existingSubmission
                      ? "Saving Changes..."
                      : "Submitting..."
                    : existingSubmission
                      ? "Save Changes"
                      : "Submit Solution"}
                </button>
              </div>
            </>
          )}

          {reviewedSubmission && (
            <div className="submit-form-actions">
              <Link to={`/problem/${id}`} className="cancel-submit-button">
                Back to Problem
              </Link>
            </div>
          )}
        </form>

        <aside className="submission-guide">
          <span>SUBMISSION GUIDE</span>
          <h2>Before you submit</h2>

          <ul>
            <li>Clearly explain your solution approach.</li>
            <li>Provide a working GitHub repository.</li>
            <li>Mention the technologies used.</li>
            <li>Add a demo link if available.</li>
            <li>Review your project details carefully.</li>
          </ul>

          <div className="submission-note">
            <strong>Tip</strong>
            <p>
              A clear explanation helps reviewers understand your solution.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default SubmitSolution;
