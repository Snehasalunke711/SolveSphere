import { apiRequest } from "./api";

export const getSolverDashboard = async () => {
  return apiRequest("/api/dashboard");
};