
package solvesphere_backend.dto;

import java.time.LocalDateTime;

public class SubmissionResponse {

    private Long id;
    private Long problemId;
    private String problemTitle;
    private Long submittedById;
    private String submittedByName;
    private String solutionTitle;
    private String solutionDescription;
    private String techStack;
    private String githubUrl;
    private String demoUrl;
    private String additionalNotes;
    private String status;
    private LocalDateTime submittedAt;

    public SubmissionResponse() {
    }

    public SubmissionResponse(
            Long id,
            Long problemId,
            String problemTitle,
            Long submittedById,
            String submittedByName,
            String solutionTitle,
            String solutionDescription,
            String techStack,
            String githubUrl,
            String demoUrl,
            String additionalNotes,
            String status,
            LocalDateTime submittedAt) {

        this.id = id;
        this.problemId = problemId;
        this.problemTitle = problemTitle;
        this.submittedById = submittedById;
        this.submittedByName = submittedByName;
        this.solutionTitle = solutionTitle;
        this.solutionDescription = solutionDescription;
        this.techStack = techStack;
        this.githubUrl = githubUrl;
        this.demoUrl = demoUrl;
        this.additionalNotes = additionalNotes;
        this.status = status;
        this.submittedAt = submittedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getProblemId() {
        return problemId;
    }

    public String getProblemTitle() {
        return problemTitle;
    }

    public Long getSubmittedById() {
        return submittedById;
    }

    public String getSubmittedByName() {
        return submittedByName;
    }

    public String getSolutionTitle() {
        return solutionTitle;
    }

    public String getSolutionDescription() {
        return solutionDescription;
    }

    public String getTechStack() {
        return techStack;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getDemoUrl() {
        return demoUrl;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }
}
