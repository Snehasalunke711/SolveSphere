const API_BASE_URL = "http://127.0.0.1:8000";

export const getAISuggestions = async (problemId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-suggestions/${problemId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch AI suggestions");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("AI Suggestion API Error:", error);
    throw error;
  }
};