
package solvesphere_backend.controller;

import solvesphere_backend.dto.CreateSubmissionRequest;
import solvesphere_backend.dto.SubmissionResponse;
import solvesphere_backend.service.SubmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/api/problems/{id}/submissions")
    public ResponseEntity<SubmissionResponse> createSubmission(
            @PathVariable Long id,
            @RequestBody CreateSubmissionRequest request) {

        SubmissionResponse response = submissionService.createSubmission(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/api/problems/{id}/submissions")
    public ResponseEntity<List<SubmissionResponse>> getProblemSubmissions(
            @PathVariable Long id) {

        return ResponseEntity.ok(submissionService.getProblemSubmissions(id));
    }

    @GetMapping("/api/submissions/{id}")
    public ResponseEntity<SubmissionResponse> getSubmissionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }

    @GetMapping("/api/submissions/my")
    public ResponseEntity<List<SubmissionResponse>> getMySubmissions() {

        return ResponseEntity.ok(submissionService.getMySubmissions());
    }

    @PutMapping("/api/submissions/{id}")
    public ResponseEntity<SubmissionResponse> updateSubmission(
            @PathVariable Long id,
            @RequestBody CreateSubmissionRequest request) {

        return ResponseEntity.ok(
                submissionService.updateSubmission(id, request)
        );
    }

    @PatchMapping("/api/submissions/{id}/status")
    public ResponseEntity<SubmissionResponse> reviewSubmission(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        SubmissionResponse response = submissionService.reviewSubmission(
                id,
                request.get("status")
        );

        return ResponseEntity.ok(response);
    }
}
