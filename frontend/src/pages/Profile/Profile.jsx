import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

const skills = [
  "React",
  "Python",
  "FastAPI",
  "Machine Learning",
  "Data Science",
];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Shree P",
    email: "shree@example.com",
    role: "Problem Solver",
    college: "New Horizon College of Engineering",
  });

  const [formData, setFormData] = useState(profile);

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <main className="profile-page">
      <Navbar />

      <section className="profile-header">
        <span>MY PROFILE</span>

        <h1>Manage Your Profile</h1>

        <p>
          Update your personal information, skills, and professional details.
        </p>
      </section>

      <section className="profile-content">
        <aside className="profile-summary-card">
          <div className="profile-avatar">SP</div>

          <h2>{profile.name}</h2>

          <p>{profile.role}</p>

          <div className="profile-summary-info">
            <div>
              <span>Solutions</span>
              <strong>4</strong>
            </div>

            <div>
              <span>Problems</span>
              <strong>2</strong>
            </div>
          </div>
        </aside>

        <div className="profile-details">
          <section className="profile-details-card">
            <div className="profile-card-heading">
              <div>
                <span>PERSONAL INFORMATION</span>
                <h2>Profile Details</h2>
              </div>

              {!isEditing && (
                <button onClick={handleEdit}>Edit Profile</button>
              )}
            </div>

            {isEditing ? (
              <div className="profile-edit-form">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>College</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>

                <div className="profile-edit-actions">
                  <button
                    className="profile-save-button"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>

                  <button
                    className="profile-cancel-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info-grid">
                <div>
                  <span>Full Name</span>
                  <strong>{profile.name}</strong>
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>{profile.email}</strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>{profile.role}</strong>
                </div>

                <div>
                  <span>College</span>
                  <strong>{profile.college}</strong>
                </div>
              </div>
            )}
          </section>

          <section className="profile-details-card">
            <div className="profile-card-heading">
              <div>
                <span>TECHNICAL SKILLS</span>
                <h2>Skills & Technologies</h2>
              </div>
            </div>

            <div className="profile-skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="profile-details-card">
            <div className="profile-card-heading">
              <div>
                <span>ABOUT</span>
                <h2>Professional Summary</h2>
              </div>
            </div>

            <p className="profile-about">
              Computer Science Engineering student interested in data science,
              AI-powered applications, and building solutions for real-world
              problems.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Profile;