
import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getProblems } from "../../services/problemService";
import "./ExploreProblems.css";

function ExploreProblems() {
  const [problems, setProblems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "ALL",
    "AI/ML",
    "WEB DEVELOPMENT",
    "APP DEVELOPMENT",
    "DATA SCIENCE",
    "IOT",
    "OTHER",
  ];

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);

        const data = await getProblems({
          search: searchTerm,
          category: selectedCategory,
          sortBy: sortBy === "default" ? "newest" : sortBy,
        });

        let results = Array.isArray(data) ? data : [];

        if (sortBy === "za") {
          results = [...results].reverse();
        }

        setProblems(results);
        setError("");
      } catch (err) {
        console.error("Failed to load problems:", err);
        setError(err.message || "Unable to load problems. Please try again.");
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, [selectedCategory, searchTerm, sortBy]);

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
        <div className="explore-tools">
          <input
            type="text"
            className="problem-search"
            placeholder="Search problems by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="problem-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Title (A–Z)</option>
            <option value="za">Title (Z–A)</option>
          </select>
        </div>

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

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : problems.length === 0 ? (
          <div className="empty-state">
            <h2>No Problems Found</h2>
            <p>
              Try changing your search or selecting a different category.
            </p>
          </div>
        ) : (
          <>
            <p className="problem-results-count">
              Showing {problems.length}{" "}
              {problems.length === 1 ? "problem" : "problems"}
            </p>

            <div className="problems-grid">
              {problems.map((problem) => (
                <article
                  className="explore-problem-card"
                  key={problem.id}
                >
                  <div className="problem-card-top">
                    <span className="explore-category">
                      {problem.category}
                    </span>

                    <span className="difficulty">
                      {problem.difficulty || "Not specified"}
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
          </>
        )}
      </section>
    </main>
  );
}

export default ExploreProblems;
