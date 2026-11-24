
package solvesphere_backend.controller;

import solvesphere_backend.dto.ParticipationResponse;
import solvesphere_backend.service.ParticipationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
public class ParticipationController {

    private final ParticipationService participationService;

    public ParticipationController(
            ParticipationService participationService) {

        this.participationService = participationService;
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<ParticipationResponse> joinProblem(
            @PathVariable Long id) {

        ParticipationResponse response =
                participationService.joinProblem(id);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<Void> leaveProblem(
            @PathVariable Long id) {

        participationService.leaveProblem(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipationResponse>> getParticipants(
            @PathVariable Long id) {

        List<ParticipationResponse> participants =
                participationService.getParticipants(id);

        return ResponseEntity.ok(participants);
    }
}
