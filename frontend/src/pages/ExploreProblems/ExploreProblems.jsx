
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
        setProblems(Array.isArray(data) ? data : []);
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

  // Category filter
  let filteredProblems =
    selectedCategory === "ALL"
      ? [...problems]
      : problems.filter(
          (problem) =>
            problem.category?.toUpperCase() === selectedCategory
        );

  // Search filter
  filteredProblems = filteredProblems.filter((problem) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      problem.title?.toLowerCase().includes(search) ||
      problem.description?.toLowerCase().includes(search) ||
      problem.objective?.toLowerCase().includes(search)
    );
  });

  // Sorting
  if (sortBy === "az") {
    filteredProblems.sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );
  } else if (sortBy === "za") {
    filteredProblems.sort((a, b) =>
      (b.title || "").localeCompare(a.title || "")
    );
  } else if (sortBy === "newest") {
    filteredProblems.sort(
      (a, b) =>
        new Date(b.createdAt || b.createdDate || 0) -
        new Date(a.createdAt || a.createdDate || 0)
    );
  } else if (sortBy === "oldest") {
    filteredProblems.sort(
      (a, b) =>
        new Date(a.createdAt || a.createdDate || 0) -
        new Date(b.createdAt || b.createdDate || 0)
    );
  }

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
        {/* Search and Sort */}
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

        {/* Category Filters */}
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
        ) : filteredProblems.length === 0 ? (
          <div className="empty-state">
            <h2>No Problems Found</h2>
            <p>
              Try changing your search or selecting a different category.
            </p>
          </div>
        ) : (
          <>
            <p className="problem-results-count">
              Showing {filteredProblems.length}{" "}
              {filteredProblems.length === 1 ? "problem" : "problems"}
            </p>

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
