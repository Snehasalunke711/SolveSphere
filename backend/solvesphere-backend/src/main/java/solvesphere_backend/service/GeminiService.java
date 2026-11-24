
package solvesphere_backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client geminiClient;

    private static final String MODEL_NAME = "gemini-3.5-flash-lite";

    public GeminiService() {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                "GEMINI_API_KEY environment variable is not configured"
            );
        }

        this.geminiClient = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String generateResponse(String prompt) {

        GenerateContentResponse response =
                geminiClient.models.generateContent(
                        MODEL_NAME,
                        prompt,
                        null
                );

        String result = response.text();

        if (result == null || result.isBlank()) {
            throw new IllegalStateException(
                "Gemini returned an empty response"
            );
        }

        return result;
    }
}
