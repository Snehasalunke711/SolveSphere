
package solvesphere_backend.dto;

import java.time.LocalDateTime;

public class ParticipationResponse {

    private Long participationId;
    private Long userId;
    private String userName;
    private String userEmail;
    private LocalDateTime joinedAt;

    public ParticipationResponse(
            Long participationId,
            Long userId,
            String userName,
            String userEmail,
            LocalDateTime joinedAt) {

        this.participationId = participationId;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.joinedAt = joinedAt;
    }

    public Long getParticipationId() {
        return participationId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }
}
