
package solvesphere_backend.dto;

public class OwnerProblemResponse {

    private Long id;
    private String title;
    private String category;
    private String status;
    private long submissions;

    public OwnerProblemResponse(
            Long id,
            String title,
            String category,
            String status,
            long submissions) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.status = status;
        this.submissions = submissions;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getStatus() {
        return status;
    }

    public long getSubmissions() {
        return submissions;
    }
}
