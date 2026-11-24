
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
    private String githubUrl;
    private String demoUrl;
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
            String githubUrl,
            String demoUrl,
            String status,
            LocalDateTime submittedAt) {
        this.id = id;
        this.problemId = problemId;
        this.problemTitle = problemTitle;
        this.submittedById = submittedById;
        this.submittedByName = submittedByName;
        this.solutionTitle = solutionTitle;
        this.solutionDescription = solutionDescription;
        this.githubUrl = githubUrl;
        this.demoUrl = demoUrl;
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

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getDemoUrl() {
        return demoUrl;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }
}
