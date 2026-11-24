
package solvesphere_backend.dto;

import java.time.LocalDateTime;

public class ProblemResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String difficulty;
    private String status;
    private String ownerName;
    private LocalDateTime createdAt;

    public ProblemResponse() {
    }

    public ProblemResponse(
            Long id,
            String title,
            String description,
            String category,
            String difficulty,
            String status,
            String ownerName,
            LocalDateTime createdAt) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.difficulty = difficulty;
        this.status = status;
        this.ownerName = ownerName;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getStatus() {
        return status;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
