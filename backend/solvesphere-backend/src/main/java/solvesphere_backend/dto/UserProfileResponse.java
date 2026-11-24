
package solvesphere_backend.dto;

import java.time.LocalDateTime;

public class UserProfileResponse {

    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private long problemsCreated;
    private long problemsJoined;
    private long solutionsSubmitted;
    private long acceptedSolutions;

    public UserProfileResponse() {
    }

    public UserProfileResponse(
            Long id,
            String name,
            String email,
            LocalDateTime createdAt,
            long problemsCreated,
            long problemsJoined,
            long solutionsSubmitted,
            long acceptedSolutions) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.problemsCreated = problemsCreated;
        this.problemsJoined = problemsJoined;
        this.solutionsSubmitted = solutionsSubmitted;
        this.acceptedSolutions = acceptedSolutions;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public long getProblemsCreated() {
        return problemsCreated;
    }

    public long getProblemsJoined() {
        return problemsJoined;
    }

    public long getSolutionsSubmitted() {
        return solutionsSubmitted;
    }

    public long getAcceptedSolutions() {
        return acceptedSolutions;
    }
}
