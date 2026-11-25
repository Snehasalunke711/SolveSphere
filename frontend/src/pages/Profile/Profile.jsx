
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { getMySubmissions } from "../../services/submissionService";
import { getOwnerProblems } from "../../services/problemService";
import { getMyProfile, updateMyProfile } from "../../services/profileService";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    domain: "",
    summary: "",
  });

  const [formData, setFormData] = useState({
    organization: "",
    domain: "",
  });

  const [summaryDraft, setSummaryDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [ownerProblems, setOwnerProblems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const profileData = await getMyProfile();

        if (!active) return;

        setProfile({
          name: profileData.name || user?.name || "",
          email: profileData.email || user?.email || "",
          role: profileData.role === "owner" ? "Problem Owner" : "Problem Solver",
          organization: profileData.organization || "",
          domain: profileData.domain || "",
          summary: profileData.summary || "",
        });

        setFormData({
          organization: profileData.organization || "",
          domain: profileData.domain || "",
        });

        setSummaryDraft(profileData.summary || "");
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load your profile.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    let active = true;

    const loadActivity = async () => {
      try {
        if (isOwner) {
          const data = await getOwnerProblems();
          if (active) {
            setOwnerProblems(Array.isArray(data) ? data : []);
          }
        } else if (user?.role === "solver") {
          const data = await getMySubmissions();
          if (active) {
            setSubmissions(Array.isArray(data) ? data : []);
          }
        }
      } catch (err) {
        if (active) {
          setError((prev) => prev || err.message || "Unable to load profile activity.");
        }
      }
    };

    loadActivity();

    return () => {
      active = false;
    };
  }, [user, isOwner]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDetails = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updateMyProfile({
        organization: formData.organization,
        domain: formData.domain,
        summary: profile.summary,
      });

      setProfile((prev) => ({
        ...prev,
        organization: updatedProfile.organization || "",
        domain: updatedProfile.domain || "",
        summary: updatedProfile.summary || "",
      }));

      setFormData({
        organization: updatedProfile.organization || "",
        domain: updatedProfile.domain || "",
      });

      setIsEditing(false);
      setSuccess("Profile details saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save profile details.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSummary = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updateMyProfile({
        organization: profile.organization,
        domain: profile.domain,
        summary: summaryDraft,
      });

      setProfile((prev) => ({
        ...prev,
        organization: updatedProfile.organization || "",
        domain: updatedProfile.domain || "",
        summary: updatedProfile.summary || "",
      }));

      setSummaryDraft(updatedProfile.summary || "");
      setIsEditingSummary(false);
      setSuccess("Introduction saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save your introduction.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelDetails = () => {
    setFormData({
      organization: profile.organization,
      domain: profile.domain,
    });
    setIsEditing(false);
    setError("");
  };

  const handleCancelSummary = () => {
    setSummaryDraft(profile.summary);
    setIsEditingSummary(false);
    setError("");
  };

  const getInitials = (name) => {
    return (name || "User")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const totalOwnerSubmissions = ownerProblems.reduce(
    (total, problem) => total + (Number(problem.submissions) || 0),
    0
  );

  return (
    <main className="profile-page">
      <Navbar />

      <section className="profile-header">
        <span>MY PROFILE</span>
        <h1>Manage Your Profile</h1>
        <p>
          {isOwner
            ? "Manage your information and showcase the challenges you bring to SolveSphere."
            : "View your profile and professional introduction."}
        </p>
      </section>

      <section className="profile-content">
        <aside className="profile-summary-card">
          <div className="profile-avatar">
            {getInitials(profile.name)}
          </div>

          <h2>{profile.name || "User"}</h2>
          <p>{profile.role || (isOwner ? "Problem Owner" : "Problem Solver")}</p>

          <div className="profile-summary-info">
            <div>
              <span>{isOwner ? "Problems Posted" : "Solutions"}</span>
              <strong>
                {loading ? "..." : isOwner ? ownerProblems.length : submissions.length}
              </strong>
            </div>

            <div>
              <span>{isOwner ? "Submissions Received" : "Accepted"}</span>
              <strong>
                {loading
                  ? "..."
                  : isOwner
                    ? totalOwnerSubmissions
                    : submissions.filter(
                        (submission) =>
                          submission.status === "ACCEPTED" ||
                          submission.status === "SELECTED"
                      ).length}
              </strong>
            </div>
          </div>
        </aside>

        <div className="profile-details">
          {error && <p className="profile-error">{error}</p>}
          {success && <p className="profile-success">{success}</p>}

          {loading ? (
            <section className="profile-details-card">
              <p>Loading your profile...</p>
            </section>
          ) : (
            <>
              <section className="profile-details-card">
                <div className="profile-card-heading">
                  <div>
                    <span>PERSONAL INFORMATION</span>
                    <h2>Profile Details</h2>
                  </div>

                  {isOwner && !isEditing && (
                    <button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing && isOwner ? (
                  <div className="profile-edit-form">
                    <div>
                      <label>Organization / Institution</label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Enter organization name"
                      />
                    </div>

                    <div>
                      <label>Industry / Domain</label>
                      <input
                        type="text"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        placeholder="e.g. Healthcare, Education, Agriculture"
                      />
                    </div>

                    <div className="profile-edit-actions">
                      <button
                        className="profile-save-button"
                        onClick={handleSaveDetails}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        className="profile-cancel-button"
                        onClick={handleCancelDetails}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-info-grid">
                    <div>
                      <span>Full Name</span>
                      <strong>{profile.name || "Not provided"}</strong>
                    </div>

                    <div>
                      <span>Email Address</span>
                      <strong>{profile.email || "Not provided"}</strong>
                    </div>

                    <div>
                      <span>Role</span>
                      <strong>{profile.role}</strong>
                    </div>

                    {isOwner && (
                      <>
                        <div>
                          <span>Organization / Institution</span>
                          <strong>{profile.organization || "Not provided"}</strong>
                        </div>

                        <div>
                          <span>Industry / Domain</span>
                          <strong>{profile.domain || "Not provided"}</strong>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </section>

              {isOwner ? (
                <section className="profile-details-card">
                  <div className="profile-card-heading">
                    <div>
                      <span>MY ACTIVITY</span>
                      <h2>Problems Posted</h2>
                    </div>
                  </div>

                  {ownerProblems.length === 0 ? (
                    <p>You haven't posted any problems yet.</p>
                  ) : (
                    <div className="profile-submissions">
                      {ownerProblems.map((problem) => (
                        <div className="profile-submission-item" key={problem.id}>
                          <div>
                            <strong>{problem.title}</strong>
                            <p>{problem.category}</p>
                          </div>

                          <span className="submission-status">
                            {problem.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ) : (
                <section className="profile-details-card">
                  <div className="profile-card-heading">
                    <div>
                      <span>MY ACTIVITY</span>
                      <h2>Submission History</h2>
                    </div>
                  </div>

                  {submissions.length === 0 ? (
                    <p>You haven't submitted any solutions yet.</p>
                  ) : (
                    <div className="profile-submissions">
                      {submissions.map((submission) => (
                        <div className="profile-submission-item" key={submission.id}>
                          <div>
                            <strong>{submission.solutionTitle}</strong>
                            <p>{submission.problemTitle}</p>
                          </div>

                          <span className={`submission-status ${(submission.status || "").toLowerCase()}`}>
                            {submission.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              <section className="profile-details-card">
                <div className="profile-card-heading">
                  <div>
                    <span>{isOwner ? "ABOUT THE OWNER" : "ABOUT"}</span>
                    <h2>{isOwner ? "Owner Introduction" : "Professional Summary"}</h2>
                  </div>

                  {!isEditingSummary && (
                    <button onClick={() => {
                      setSummaryDraft(profile.summary);
                      setIsEditingSummary(true);
                    }}>
                      {profile.summary ? "Edit Introduction" : "Add Introduction"}
                    </button>
                  )}
                </div>

                {isEditingSummary ? (
                  <div className="profile-edit-form">
                    <label>
                      {isOwner ? "Introduce yourself" : "Professional Summary"}
                    </label>

                    <textarea
                      value={summaryDraft}
                      onChange={(event) => setSummaryDraft(event.target.value)}
                      rows="5"
                      placeholder={
                        isOwner
                          ? "Tell problem solvers about yourself, your organization, and the challenges you bring to SolveSphere..."
                          : "Describe your interests, experience, and career goals..."
                      }
                    />

                    <div className="profile-edit-actions">
                      <button
                        className="profile-save-button"
                        onClick={handleSaveSummary}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Introduction"}
                      </button>

                      <button
                        className="profile-cancel-button"
                        onClick={handleCancelSummary}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="profile-about">
                    {profile.summary ||
                      (isOwner
                        ? "No introduction added yet. Tell problem solvers a little about yourself."
                        : "No professional summary added yet.")}
                  </p>
                )}
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Profile;
