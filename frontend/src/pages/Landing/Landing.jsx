import "./Landing.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Landing() {
  return (
    <main className="landing-page">
        <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Turn Real Problems Into Real Solutions
          </h1>

          <p className="hero-description">
            SolveSphere connects problem owners with talented problem solvers
            to collaborate, innovate, and build meaningful solutions.
          </p>

          <div className="hero-buttons">
            <button className="primary-button">
              Explore Problems
            </button>

            <button className="secondary-button">
              Post a Problem
            </button>
          </div>
        </div>
      </section>
      
            <section className="how-it-works">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From Problem to Solution</h2>
          <p>
            SolveSphere makes collaboration simple, transparent, and focused
            on building real solutions.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Post a Problem</h3>
            <p>
              Share a real-world challenge and explain the problem that needs
              to be solved.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Collaborate & Solve</h3>
            <p>
              Problem solvers explore challenges, build ideas, and submit their
              solutions.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Review Solutions</h3>
            <p>
              Problem owners review submissions and discover promising
              solutions.
            </p>
          </div>
        </div>
      </section>
      <section className="roles-section">
  <div className="section-heading">
    <span>BUILT FOR COLLABORATION</span>
    <h2>One Platform. Two Powerful Roles.</h2>
    <p>
      Whether you have a problem that needs solving or the skills to build a
      solution, SolveSphere gives you a place to collaborate.
    </p>
  </div>

  <div className="roles-container">
    <div className="role-card">
      <div className="role-label">FOR PROBLEM OWNERS</div>

      <h3>Turn Challenges Into Opportunities</h3>

      <p>
        Post real-world problems, connect with talented problem solvers, and
        review innovative solutions built for your challenge.
      </p>

      <ul>
        <li>Post and manage problems</li>
        <li>Track submitted solutions</li>
        <li>Review solver submissions</li>
        <li>Discover promising ideas</li>
      </ul>

      <button className="role-button">Post a Problem</button>
    </div>

    <div className="role-card solver-card">
      <div className="role-label">FOR PROBLEM SOLVERS</div>

      <h3>Build Solutions That Matter</h3>

      <p>
        Explore meaningful challenges, use AI-powered guidance, and submit your
        work directly to problem owners.
      </p>

      <ul>
        <li>Explore real-world problems</li>
        <li>Work on selected challenges</li>
        <li>Get AI-powered suggestions</li>
        <li>Submit completed projects</li>
      </ul>

      <button className="role-button">Explore Problems</button>
    </div>
  </div>
</section>
<section className="ai-section">
  <div className="ai-container">
    <div className="ai-content">
      <span className="ai-label">AI-POWERED GUIDANCE</span>

      <h2>Don't Just Solve. Solve Smarter.</h2>

      <p>
        SolveSphere uses AI to understand problem statements and guide problem
        solvers with relevant suggestions, approaches, and technology ideas.
      </p>

      <div className="ai-features">
        <div className="ai-feature">
          <h4>Problem Understanding</h4>
          <p>AI analyzes the challenge and highlights important requirements.</p>
        </div>

        <div className="ai-feature">
          <h4>Smart Suggestions</h4>
          <p>Receive useful approaches and ideas based on the selected problem.</p>
        </div>

        <div className="ai-feature">
          <h4>Technology Guidance</h4>
          <p>Discover suitable technologies and tools for building the solution.</p>
        </div>
      </div>
    </div>

    <div className="ai-preview">
      <div className="ai-preview-header">
        <span className="ai-dot"></span>
        AI Suggestions
      </div>

      <div className="ai-message">
        <span>Problem Analysis</span>
        <p>
          This problem focuses on improving waste collection efficiency in
          urban areas.
        </p>
      </div>

      <div className="ai-message">
        <span>Suggested Approach</span>
        <p>
          Consider a location-based monitoring system with route optimization.
        </p>
      </div>

      <div className="ai-message">
        <span>Recommended Tech</span>
        <p>React · FastAPI · Python · Machine Learning</p>
      </div>
    </div>
  </div>
</section>
<section className="cta-section">
  <div className="cta-content">
    <h2>Ready to Turn Ideas Into Solutions?</h2>

    <p>
      Join SolveSphere and start solving meaningful real-world problems today.
    </p>

    <div className="cta-buttons">
      <button className="cta-primary">Explore Problems</button>
      <button className="cta-secondary">Post a Problem</button>
    </div>
  </div>
</section>
<Footer />
    </main>
  );
}

export default Landing;