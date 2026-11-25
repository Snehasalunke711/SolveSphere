
package solvesphere_backend.dto;

import java.time.LocalDateTime;

public class ParticipationResponse {

    private Long participationId;
    private Long userId;
    private String userName;
    private LocalDateTime joinedAt;

    public ParticipationResponse(
            Long participationId,
            Long userId,
            String userName,
            LocalDateTime joinedAt) {

        this.participationId = participationId;
        this.userId = userId;
        this.userName = userName;
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

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }
}
