package solvesphere_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateProblemRequest {

    @NotBlank(message = "Problem title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Problem description is required")
    private String description;

    @NotBlank(message = "Category is required")
    @Pattern(
        regexp = "AI/ML|Web Development|App Development|Data Science|IoT|Other",
        message = "Invalid category"
    )
    private String category;

    @NotBlank(message = "Difficulty is required")
    @Pattern(
        regexp = "Easy|Medium|Hard",
        message = "Difficulty must be Easy, Medium, or Hard"
    )
    private String difficulty;

    public UpdateProblemRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}