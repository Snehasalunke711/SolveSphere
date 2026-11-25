
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./AISuggestions.css";
import {
  getAISuggestions,
  getAIChatResponse,
} from "../../services/aiSuggestionService";

function AISuggestions() {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problem") || "1";

  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  useEffect(() => {
    const loadSuggestions = async () => {
      setLoading(true);
      setError("");
      setSuggestions(null);

      try {
        const data = await getAISuggestions(problemId);
        setSuggestions(data);
      } catch (err) {
        console.error("AI Suggestions Error:", err);
        setError(
          err.message || "Unable to generate AI suggestions. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, [problemId]);

  useEffect(() => {
    setChatMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your SolveSphere AI Assistant. I've got your problem and its AI-generated suggestions as context. Ask me anything about the approach, technologies, roadmap, coding or implementation. Let's build your solution together!",
      },
    ]);
    setChatInput("");
    setChatError("");
  }, [problemId]);

  const handleChatSubmit = async (event) => {
    event.preventDefault();

    const question = chatInput.trim();

    if (!question || chatLoading || !suggestions) {
      return;
    }

    const previousMessages = chatMessages;

    setChatMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: question,
      },
    ]);

    setChatInput("");
    setChatLoading(true);
    setChatError("");

    try {
      const answer = await getAIChatResponse(
        problemId,
        question,
        previousMessages,
        suggestions
      );

      setChatMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      setChatError(
        err.message || "Unable to get an AI response. Please try again."
      );
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <main className="ai-suggestions-page">
      <Navbar />

      <section className="suggestions-header">
        <Link
          to={`/problem/${problemId}`}
          className="suggestions-back-link"
        >
          ← Back to Problem
        </Link>

        <span className="suggestions-label">
          AI-POWERED GUIDANCE
        </span>

        <h1>Build Your Solution Smarter</h1>

        <p>
          Explore AI-generated guidance to understand the challenge,
          discover possible approaches, and select suitable technologies.
        </p>
      </section>

      {loading ? (
        <p className="loading-message">
          Generating AI suggestions for your problem...
        </p>
      ) : error ? (
        <section className="suggestions-content">
          <p className="error-message">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="suggestions-start-button"
          >
            Try Again
          </button>
        </section>
      ) : suggestions ? (
        <section className="suggestions-content">
          <div className="suggestion-card">
            <div className="suggestion-number">01</div>

            <div>
              <span>PROBLEM UNDERSTANDING</span>
              <h2>Understand the Core Challenge</h2>
              <p>{suggestions.understanding}</p>
            </div>
          </div>

          <div className="suggestion-card">
            <div className="suggestion-number">02</div>

            <div>
              <span>SUGGESTED APPROACH</span>
              <h2>Build a Solution</h2>
              <p>{suggestions.approach}</p>
            </div>
          </div>

          <div className="suggestion-card">
            <div className="suggestion-number">03</div>

            <div>
              <span>RECOMMENDED TECHNOLOGIES</span>
              <h2>Suggested Technology Stack</h2>

              <div className="technology-list">
                {suggestions.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="suggestion-card">
            <div className="suggestion-number">04</div>

            <div>
              <span>DEVELOPMENT ROADMAP</span>
              <h2>Suggested Implementation Steps</h2>

              <ol className="roadmap-list">
                {suggestions.roadmap.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <section className="ai-chat-section">
            <div className="ai-chat-heading">
              <div className="ai-chat-icon">✦</div>

              <div>
                <span className="ai-chat-label">
                  YOUR PERSONAL AI MENTOR
                </span>
                <h2>Have Questions? Let's Talk.</h2>
                <p>
                  Continue exploring this problem with your AI assistant.
                </p>
              </div>
            </div>

            <div className="ai-chat-container">
              <div className="ai-chat-topbar">
                <div className="ai-chat-avatar">✦</div>

                <div>
                  <h3>SolveSphere AI Assistant</h3>
                  <span>
                    <span className="ai-chat-online-dot"></span>
                    Ready to help you
                  </span>
                </div>
              </div>

              <div className="ai-chat-messages">
                {chatMessages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`ai-chat-message ${
                      message.role === "user"
                        ? "user-message"
                        : "assistant-message"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="ai-message-avatar">✦</div>
                    )}

                    <div className="ai-message-content">
                      <span className="ai-message-sender">
                        {message.role === "user" ? "You" : "SolveSphere AI"}
                      </span>

                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="ai-chat-message assistant-message">
                    <div className="ai-message-avatar">✦</div>

                    <div className="ai-message-content">
                      <span className="ai-message-sender">
                        SolveSphere AI
                      </span>

                      <div className="ai-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {chatError && (
                <div className="ai-chat-error">
                  {chatError}
                </div>
              )}

              <div className="ai-chat-suggestions">
                <button
                  type="button"
                  onClick={() =>
                    setChatInput("Explain the suggested approach step by step.")
                  }
                  disabled={chatLoading}
                >
                  Explain the approach
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setChatInput("Which technology should I start with and why?")
                  }
                  disabled={chatLoading}
                >
                  Help me choose technologies
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setChatInput("Break the roadmap into smaller development tasks.")
                  }
                  disabled={chatLoading}
                >
                  Break down the roadmap
                </button>
              </div>

              <form
                className="ai-chat-input-area"
                onSubmit={handleChatSubmit}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Ask anything about your problem..."
                  disabled={chatLoading}
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                >
                  {chatLoading ? "..." : "Send"}
                  <span>➤</span>
                </button>
              </form>

              <p className="ai-chat-disclaimer">
                AI-generated responses may need verification. Use them as
                guidance while building your solution.
              </p>
            </div>
          </section>

          <div className="suggestions-action">
            <div>
              <h2>Ready to start building?</h2>
              <p>
                Use this AI-generated guidance as a starting point
                for your solution.
              </p>
            </div>

            <Link
              to={`/submit-solution/${problemId}`}
              className="suggestions-start-button"
            >
              Start Solving
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default AISuggestions;
