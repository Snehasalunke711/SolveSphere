
package solvesphere_backend.service;

import solvesphere_backend.dto.CreateSubmissionRequest;
import solvesphere_backend.dto.SubmissionResponse;
import solvesphere_backend.entity.Problem;
import solvesphere_backend.entity.Submission;
import solvesphere_backend.entity.User;
import solvesphere_backend.repository.ParticipationRepository;
import solvesphere_backend.repository.ProblemRepository;
import solvesphere_backend.repository.SubmissionRepository;
import solvesphere_backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final ParticipationRepository participationRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    public SubmissionService(
            SubmissionRepository submissionRepository,
            ParticipationRepository participationRepository,
            ProblemRepository problemRepository,
            UserRepository userRepository) {
        this.submissionRepository = submissionRepository;
        this.participationRepository = participationRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private Problem getProblem(Long problemId) {
        return problemRepository.findById(problemId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Problem not found with ID: " + problemId));
    }

    private Submission getSubmission(Long submissionId) {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Submission not found with ID: " + submissionId));
    }

    @Transactional
    public SubmissionResponse createSubmission(Long problemId, CreateSubmissionRequest request) {
        User user = getAuthenticatedUser();
        Problem problem = getProblem(problemId);

        if (!"OPEN".equalsIgnoreCase(problem.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot submit a solution to a closed problem");
        }

        boolean hasJoined = participationRepository.existsByUserIdAndProblemId(user.getId(), problemId);

        if (!hasJoined) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You must join this problem before submitting a solution");
        }

        boolean alreadySubmitted = submissionRepository
                .existsByProblemIdAndSubmittedById(problemId, user.getId());

        if (alreadySubmitted) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "You have already submitted a solution for this problem");
        }

        if (request.getSolutionTitle() == null || request.getSolutionTitle().isBlank()
                || request.getSolutionDescription() == null || request.getSolutionDescription().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Solution title and description are required");
        }

        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setSubmittedBy(user);
        submission.setSolutionTitle(request.getSolutionTitle());
        submission.setSolutionDescription(request.getSolutionDescription());
        submission.setGithubUrl(request.getGithubUrl());
        submission.setDemoUrl(request.getDemoUrl());
        submission.setStatus("PENDING");

        Submission savedSubmission = submissionRepository.save(submission);
        return convertToResponse(savedSubmission);
    }

    @Transactional(readOnly = true)
    public List<SubmissionResponse> getProblemSubmissions(Long problemId) {
        User user = getAuthenticatedUser();
        Problem problem = getProblem(problemId);

        if (!problem.getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only the problem owner can view all submissions");
        }

        return submissionRepository.findByProblemId(problemId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SubmissionResponse> getMySubmissions() {
        User user = getAuthenticatedUser();

        return submissionRepository.findBySubmittedById(user.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional
    public SubmissionResponse reviewSubmission(Long submissionId, String newStatus) {
        User user = getAuthenticatedUser();
        Submission submission = getSubmission(submissionId);

        if (!submission.getProblem().getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only the problem owner can review submissions");
        }

        if (!"ACCEPTED".equals(newStatus) && !"REJECTED".equals(newStatus)
                && !"SELECTED".equals(newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid submission status");
        }

        if ("SELECTED".equals(submission.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Selected solution cannot be changed");
        }

        if ("SELECTED".equals(newStatus)) {
            boolean alreadySelected = submissionRepository
                    .existsByProblemIdAndStatus(submission.getProblem().getId(), "SELECTED");

            if (alreadySelected) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "A best solution has already been selected for this problem");
            }
        }

        submission.setStatus(newStatus);
        Submission updatedSubmission = submissionRepository.save(submission);

        return convertToResponse(updatedSubmission);
    }

    private SubmissionResponse convertToResponse(Submission submission) {
        return new SubmissionResponse(
                submission.getId(),
                submission.getProblem().getId(),
                submission.getProblem().getTitle(),
                submission.getSubmittedBy().getId(),
                submission.getSubmittedBy().getName(),
                submission.getSolutionTitle(),
                submission.getSolutionDescription(),
                submission.getGithubUrl(),
                submission.getDemoUrl(),
                submission.getStatus(),
                submission.getSubmittedAt()
        );
    }
}
