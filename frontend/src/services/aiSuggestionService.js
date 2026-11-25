
import { apiRequest } from "./api";
import { getProblemById } from "./problemService";

export const getAISuggestions = async (problemId) => {
  const problem = await getProblemById(problemId);

  const prompt = `
You are an expert software architect and project mentor.

Analyze the following problem and generate practical implementation guidance.

Problem Title: ${problem.title}
Problem Category: ${problem.category || "Not specified"}
Problem Description: ${problem.description}
Problem Objective: ${problem.objective || problem.description}

Return ONLY a valid JSON object without markdown code fences.

Use exactly this structure:
{
  "understanding": "Explain the core problem and challenge.",
  "approach": "Explain a practical technical approach to solve it.",
  "technologies": ["Technology 1", "Technology 2", "Technology 3"],
  "roadmap": [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5"
  ]
}

Keep the suggestions specific to the given problem.
Do not return any text outside the JSON object.
`;

  const data = await apiRequest("/api/ai/generate", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  if (!data.response) {
    throw new Error("AI did not return a response.");
  }

  let responseText = data.response.trim();

  responseText = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("AI returned an invalid response format.");
  }

  const suggestions = JSON.parse(
    responseText.substring(jsonStart, jsonEnd + 1)
  );

  if (
    !suggestions.understanding ||
    !suggestions.approach ||
    !Array.isArray(suggestions.technologies) ||
    !Array.isArray(suggestions.roadmap)
  ) {
    throw new Error("AI response is missing required sections.");
  }

  return suggestions;
};

export const getAIChatResponse = async (
  problemId,
  question,
  history,
  suggestions
) => {
  const problem = await getProblemById(problemId);

  const conversationHistory = history
    .map((message) => {
      const speaker = message.role === "user" ? "User" : "AI Assistant";
      return `${speaker}: ${message.content}`;
    })
    .join("\n\n");

  const prompt = `
You are SolveSphere AI Assistant, an expert software development mentor.

You are helping a Problem Solver understand and solve a specific project challenge.

CURRENT PROBLEM:

Title: ${problem.title}
Category: ${problem.category || "Not specified"}
Description: ${problem.description}
Objective: ${problem.objective || problem.description}

AI-GENERATED SUGGESTIONS:

${JSON.stringify(suggestions, null, 2)}

PREVIOUS CONVERSATION:

${conversationHistory || "This is the beginning of the conversation."}

CURRENT USER QUESTION:

${question}

INSTRUCTIONS:

1. Answer specifically in the context of the current problem.
2. Use the generated suggestions as context when relevant.
3. Explain technical concepts in beginner-friendly language.
4. Give practical implementation steps and examples when useful.
5. Help with architecture, programming languages, frameworks, databases, algorithms, debugging and project planning.
6. If the user asks for code, provide correct and relevant code with an explanation.
7. Remember the previous conversation and answer follow-up questions consistently.
8. Do not unnecessarily repeat the entire AI-generated roadmap.
9. If something is outside the problem's context, answer helpfully while keeping the discussion relevant.
10. Do not claim that code has been executed or tested when it has not.

Respond naturally as a helpful conversational AI assistant. Do not return JSON.
`;

  const data = await apiRequest("/api/ai/generate", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  if (!data.response || !data.response.trim()) {
    throw new Error("AI assistant returned an empty response.");
  }

  return data.response.trim();
};
