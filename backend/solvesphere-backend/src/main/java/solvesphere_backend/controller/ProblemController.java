
package solvesphere_backend.controller;

import solvesphere_backend.dto.CreateProblemRequest;
import solvesphere_backend.dto.UpdateProblemRequest;
import solvesphere_backend.dto.ProblemResponse;
import solvesphere_backend.service.ProblemService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @PostMapping
    public ResponseEntity<ProblemResponse> createProblem(
            @Valid @RequestBody CreateProblemRequest request) {

        ProblemResponse response =
                problemService.createProblem(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProblemResponse>> getAllProblems(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "newest") String sortBy) {

        List<ProblemResponse> problems =
                problemService.getAllProblems(
                        search, category, difficulty, status, sortBy);

        return ResponseEntity.ok(problems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemResponse> getProblemById(
            @PathVariable Long id) {

        ProblemResponse response =
                problemService.getProblemById(id);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProblemResponse> updateProblem(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProblemRequest request) {

        ProblemResponse response =
                problemService.updateProblem(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(
            @PathVariable Long id) {

        problemService.deleteProblem(id);

        return ResponseEntity.noContent().build();
    }
}
