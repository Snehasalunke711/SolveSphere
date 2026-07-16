import { apiRequest } from "./api";

export const submitSolution = async (problemId, solutionData) => {
  return apiRequest(`/api/problems/${problemId}/solutions`, {
    method: "POST",
    body: JSON.stringify(solutionData),
  });
};

export const getSolutionById = async (solutionId) => {
  return apiRequest(`/api/solutions/${solutionId}`);
};

export const reviewSolution = async (solutionId, reviewData) => {
  return apiRequest(`/api/solutions/${solutionId}/review`, {
    method: "PUT",
    body: JSON.stringify(reviewData),
  });
};