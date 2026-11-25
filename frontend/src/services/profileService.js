
import { apiRequest } from "./api";

export const getMyProfile = async () => {
  return apiRequest("/api/users/profile");
};

export const updateMyProfile = async (profileData) => {
  return apiRequest("/api/users/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};
