
import { apiRequest } from "./api";

export const submitSolution = async (problemId, solutionData) => {
  return apiRequest(`/api/problems/${problemId}/submissions`, {
    method: "POST",
    body: JSON.stringify(solutionData),
  });
};

export const getSolutionById = async (submissionId) => {
  return apiRequest(`/api/submissions/${submissionId}`);
};

export const reviewSolution = async (submissionId, status) => {
  return apiRequest(`/api/submissions/${submissionId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};
