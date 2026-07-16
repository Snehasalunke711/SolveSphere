import { apiRequest } from "./api";

const fallbackProblems = [
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