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

          <h2>Shree P</h2>

          <p>Problem Solver</p>

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

              <button>Edit Profile</button>
            </div>

            <div className="profile-info-grid">
              <div>
                <span>Full Name</span>
                <strong>Shree P</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>shree@example.com</strong>
              </div>

              <div>
                <span>Role</span>
                <strong>Problem Solver</strong>
              </div>

              <div>
                <span>College</span>
                <strong>New Horizon College of Engineering</strong>
              </div>
            </div>
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