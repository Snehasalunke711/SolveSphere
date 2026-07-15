import { Link } from "react-router";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ExploreProblems.css";

const problems = [
  {
    id: 1,
    category: "SMART CITY",
    title: "Improve Urban Waste Collection Efficiency",
    description:
      "Build a smarter system to monitor waste collection and optimize collection routes.",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    category: "HEALTHCARE",
    title: "Improve Emergency Resource Discovery",
    description:
      "Design a platform that helps users quickly discover nearby emergency resources.",
    difficulty: "Advanced",
  },
  {
    id: 3,
    category: "EDUCATION",
    title: "Personalized Learning Resource Discovery",
    description:
      "Create a solution that recommends useful learning resources based on student needs.",
    difficulty: "Beginner",
  },
  {
    id: 4,
    category: "ENVIRONMENT",
    title: "Monitor Urban Air Quality",
    description:
      "Develop a system to analyze air quality information and identify pollution patterns.",
    difficulty: "Intermediate",
  },
  {
    id: 5,
    category: "AGRICULTURE",
    title: "Smart Crop Monitoring",
    description:
      "Help farmers monitor crop conditions and discover early signs of crop stress.",
    difficulty: "Advanced",
  },
  {
    id: 6,
    category: "TRANSPORT",
    title: "Reduce Traffic Congestion",
    description:
      "Build a data-driven solution to understand traffic patterns and improve urban mobility.",
    difficulty: "Intermediate",
  },
];

function ExploreProblems() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    "ALL",
    "SMART CITY",
    "HEALTHCARE",
    "EDUCATION",
    "ENVIRONMENT",
  ];

  const filteredProblems =
    selectedCategory === "ALL"
      ? problems
      : problems.filter(
          (problem) => problem.category === selectedCategory
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

        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <article className="explore-problem-card" key={problem.id}>
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
      </section>
    </main>
  );
}

export default ExploreProblems;