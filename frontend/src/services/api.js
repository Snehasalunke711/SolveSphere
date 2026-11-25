
const API_BASE_URL = "http://localhost:8080";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  } catch (error) {
    throw new Error(
      "Unable to connect to SolveSphere. Please check whether the server is running."
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    let message = errorData.message || errorData.error;

    if (response.status === 401) {
      message = "Invalid email or password. Please try again.";
    } else if (response.status === 403) {
      message = "You don't have permission to perform this action.";
    } else if (response.status >= 500) {
      message = "Something went wrong on the server. Please try again later.";
    } else if (!message) {
      message = "Something went wrong. Please try again.";
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export default API_BASE_URL;
