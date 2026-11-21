import { apiRequest } from "./api";

const fallbackProblems = [
  {
    id: 1,
    category: "SMART CITY",
    title: "Improve Urban Waste Collection Efficiency",
    description:
      "Build a smarter system to monitor waste collection and optimize collection routes.",
    objective:
      "How can we develop a smart waste collection system that monitors waste levels, identifies overflowing bins, and optimizes collection routes to reduce delays and improve efficiency?",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    category: "HEALTHCARE",
    title: "Improve Emergency Resource Discovery",
    description:
      "Design a platform that helps users quickly discover nearby emergency resources.",
    objective:
      "How can we build a platform that helps people quickly locate nearby hospitals, emergency services, ambulances, and other essential medical resources during emergencies?",
    difficulty: "Advanced",
  },
  {
    id: 3,
    category: "EDUCATION",
    title: "Personalized Learning Resource Discovery",
    description:
      "Create a solution that recommends useful learning resources based on student needs.",
    objective:
      "How can we create a personalized learning platform that understands students' learning needs and recommends relevant study materials, courses, and educational resources?",
    difficulty: "Beginner",
  },
  {
    id: 4,
    category: "ENVIRONMENT",
    title: "Monitor Urban Air Quality",
    description:
      "Develop a system to analyze air quality information and identify pollution patterns.",
    objective:
      "How can we develop a system that monitors urban air quality, analyzes pollution levels, identifies pollution hotspots, and provides useful information to help reduce air pollution?",
    difficulty: "Intermediate",
  },
  {
    id: 5,
    category: "AGRICULTURE",
    title: "Smart Crop Monitoring",
    description:
      "Help farmers monitor crop conditions and discover early signs of crop stress.",
    objective:
      "How can we design a smart crop monitoring system that tracks crop conditions, detects early signs of crop stress, and helps farmers make better decisions to improve crop health and productivity?",
    difficulty: "Advanced",
  },
  {
    id: 6,
    category: "TRANSPORT",
    title: "Reduce Traffic Congestion",
    description:
      "Build a data-driven solution to understand traffic patterns and improve urban mobility.",
    objective:
      "How can we develop a data-driven traffic management system that analyzes traffic patterns, identifies congested areas, and suggests better routes to reduce travel time and improve urban mobility?",
    difficulty: "Intermediate",
  },
];

export const getProblems = async () => {
  try {
    return await apiRequest("/api/problems");
  } catch (error) {
    console.warn(
      "Problems API unavailable. Using fallback data.",
      error
    );

    return fallbackProblems;
  }
};

export const getProblemById = async (id) => {
  try {
    return await apiRequest(`/api/problems/${id}`);
  } catch (error) {
    console.warn(
      "Problem API unavailable. Using fallback data.",
      error
    );

    return fallbackProblems.find(
      (problem) => problem.id === Number(id)
    );
  }
};

export const createProblem = async (problemData) => {
  return apiRequest("/api/problems", {
    method: "POST",
    body: JSON.stringify(problemData),
  });
};

export const getProblemSubmissions = async (problemId) => {
  return apiRequest(`/api/problems/${problemId}/submissions`);
};

/* ============================
   OWNER DASHBOARD
============================ */

export const getOwnerProblems = async () => {
  try {
    return await apiRequest("/api/owner/problems");
  } catch (error) {
    console.warn(
      "Owner dashboard API unavailable. Using fallback data.",
      error
    );

    return fallbackProblems.slice(0, 3).map((problem, index) => ({
      ...problem,
      submissions: [12, 8, 5][index],
      status: ["Active", "Active", "Reviewing"][index],
    }));
  }
};
