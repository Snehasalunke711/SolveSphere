
import { apiRequest } from "./api";

export const submitSolution = async (problemId, solutionData) => {
  return apiRequest(`/api/problems/${problemId}/submissions`, {
    method: "POST",
    body: JSON.stringify(solutionData),
  });
};

export const updateSolution = async (submissionId, solutionData) => {
  return apiRequest(`/api/submissions/${submissionId}`, {
    method: "PUT",
    body: JSON.stringify(solutionData),
  });
};

export const getSubmissions = async (problemId) => {
  return apiRequest(`/api/problems/${problemId}/submissions`);
};

export const getSubmission = async (submissionId) => {
  return apiRequest(`/api/submissions/${submissionId}`);
};

export const reviewSubmission = async (submissionId, status) => {
  return apiRequest(`/api/submissions/${submissionId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const getMySubmissions = async () => {
  return apiRequest("/api/submissions/my");
};
