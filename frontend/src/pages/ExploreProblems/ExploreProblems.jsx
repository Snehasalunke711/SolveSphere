import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getProblems } from "../../services/problemService";
import "./ExploreProblems.css";

function ExploreProblems() {
  const [problems, setProblems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "ALL",
    "SMART CITY",
    "HEALTHCARE",
    "EDUCATION",
    "ENVIRONMENT",
    "AGRICULTURE",
    "TRANSPORT",
  ];

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);

        const data = await getProblems();

        setProblems(data);
        setError("");
      } catch (err) {
        console.error("Failed to load problems:", err);

        setError("Unable to load problems. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const filteredProblems =
    selectedCategory === "ALL"
      ? problems
      : problems.filter(
          (problem) =>
            problem.category?.toUpperCase() === selectedCategory
        );

  return (
    <main className="explore-page">
      <Navbar />

      <section className="explore-header">
        <span>EXPLORE CHALLENGES</span>

        <h1>Find a Problem Worth Solving</h1>

        <p>
          Discover real-world challenges, explore meaningful ideas, and start
          building solutions that create impact.
        </p>
      </section>

      <section className="explore-content">
        <div className="problem-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category ? "active-filter" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category === "ALL" ? "All Problems" : category}
            </button>
          ))}
        </div>

        {loading && <p>Loading problems...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="problems-grid">
            {filteredProblems.map((problem) => (
              <article
                className="explore-problem-card"
                key={problem.id}
              >
                <div className="problem-card-top">
                  <span className="explore-category">
                    {problem.category}
                  </span>

                  <span className="difficulty">
                    {problem.difficulty}
                  </span>
                </div>

                <h2>{problem.title}</h2>

                <p>{problem.description}</p>

                <Link to={`/problem/${problem.id}`}>
                  View Problem
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ExploreProblems;