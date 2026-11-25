
import { apiRequest } from "./api";

export const getProblems = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search?.trim()) {
    params.append("search", filters.search.trim());
  }

  if (filters.category && filters.category !== "ALL") {
    params.append("category", filters.category);
  }

  const sortBy = filters.sortBy || "newest";
  params.append("sortBy", sortBy === "az" || sortBy === "za" ? "title" : sortBy);

  const queryString = params.toString();

  return apiRequest(`/api/problems${queryString ? `?${queryString}` : ""}`);
};

export const getProblemById = async (id) =>
  apiRequest(`/api/problems/${id}`);

export const createProblem = async (problemData) =>
  apiRequest("/api/problems", {
    method: "POST",
    body: JSON.stringify(problemData),
  });

export const getProblemSubmissions = async (problemId) =>
  apiRequest(`/api/problems/${problemId}/submissions`);

export const getOwnerProblems = async () =>
  apiRequest("/api/problems/mine");

export const joinProblem = async (problemId) =>
  apiRequest(`/api/problems/${problemId}/join`, {
    method: "POST",
  });

export const leaveProblem = async (problemId) =>
  apiRequest(`/api/problems/${problemId}/leave`, {
    method: "DELETE",
  });

export const getProblemParticipants = async (problemId) =>
  apiRequest(`/api/problems/${problemId}/participants`);
