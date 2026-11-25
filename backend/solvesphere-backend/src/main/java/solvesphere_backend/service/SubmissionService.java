
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private User requireSolverRole() {
        User user = getAuthenticatedUser();

        if (!"solver".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only solvers can submit solutions");
        }

        return user;
    }

    private User requireOwnerRole() {
        User user = getAuthenticatedUser();

        if (!"owner".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only owners can review submissions");
        }

        return user;
    }

    private Problem getProblem(Long problemId) {
        return problemRepository.findById(problemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Problem not found with ID: " + problemId
                ));
    }

    private Submission getSubmission(Long submissionId) {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Submission not found with ID: " + submissionId
                ));
    }

    @Transactional
    public SubmissionResponse createSubmission(Long problemId, CreateSubmissionRequest request) {
        User user = requireSolverRole();
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

        boolean alreadySubmitted = submissionRepository.existsByProblemIdAndSubmittedById(
                problemId, user.getId()
        );

        if (alreadySubmitted) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "You have already submitted a solution for this problem");
        }

        validateRequest(request);

        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setSubmittedBy(user);
        submission.setSolutionTitle(request.getSolutionTitle());
        submission.setSolutionDescription(request.getSolutionDescription());
        submission.setTechStack(request.getTechStack());
        submission.setGithubUrl(request.getGithubUrl());
        submission.setDemoUrl(request.getDemoUrl());
        submission.setAdditionalNotes(request.getAdditionalNotes());
        submission.setStatus("PENDING");

        return convertToResponse(submissionRepository.save(submission));
    }

    @Transactional
    public SubmissionResponse updateSubmission(Long submissionId, CreateSubmissionRequest request) {
        User user = requireSolverRole();
        Submission submission = getSubmission(submissionId);

        if (!submission.getSubmittedBy().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You can only edit your own submission");
        }

        if (!"PENDING".equalsIgnoreCase(submission.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Only pending submissions can be edited");
        }

        if (!"OPEN".equalsIgnoreCase(submission.getProblem().getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot edit a submission for a closed problem");
        }

        validateRequest(request);

        submission.setSolutionTitle(request.getSolutionTitle());
        submission.setSolutionDescription(request.getSolutionDescription());
        submission.setTechStack(request.getTechStack());
        submission.setGithubUrl(request.getGithubUrl());
        submission.setDemoUrl(request.getDemoUrl());
        submission.setAdditionalNotes(request.getAdditionalNotes());

        return convertToResponse(submissionRepository.save(submission));
    }

    private void validateRequest(CreateSubmissionRequest request) {
        if (request.getSolutionTitle() == null || request.getSolutionTitle().isBlank()
                || request.getSolutionDescription() == null
                || request.getSolutionDescription().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Solution title and description are required");
        }
    }

    @Transactional(readOnly = true)
    public List<SubmissionResponse> getProblemSubmissions(Long problemId) {
        User user = requireOwnerRole();
        Problem problem = getProblem(problemId);

        if (problem.getOwner() == null || !problem.getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only the problem owner can view all submissions");
        }

        return submissionRepository.findByProblemId(problemId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SubmissionResponse getSubmissionById(Long submissionId) {
        User user = requireOwnerRole();
        Submission submission = getSubmission(submissionId);

        if (submission.getProblem().getOwner() == null
                || !submission.getProblem().getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only the problem owner can view this submission");
        }

        return convertToResponse(submission);
    }

    @Transactional(readOnly = true)
    public List<SubmissionResponse> getMySubmissions() {
        User user = requireSolverRole();

        return submissionRepository.findBySubmittedById(user.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional
    public SubmissionResponse reviewSubmission(Long submissionId, String newStatus) {
        User user = requireOwnerRole();
        Submission submission = getSubmission(submissionId);

        if (submission.getProblem().getOwner() == null
                || !submission.getProblem().getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only the problem owner can review submissions");
        }

        if (!"ACCEPTED".equals(newStatus)
                && !"REJECTED".equals(newStatus)
                && !"SELECTED".equals(newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid submission status");
        }

        if ("SELECTED".equals(submission.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Selected solution cannot be changed");
        }

        if ("SELECTED".equals(newStatus)) {
            boolean alreadySelected = submissionRepository.existsByProblemIdAndStatus(
                    submission.getProblem().getId(), "SELECTED"
            );

            if (alreadySelected) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "A best solution has already been selected for this problem");
            }
        }

        submission.setStatus(newStatus);

        return convertToResponse(submissionRepository.save(submission));
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
                submission.getTechStack(),
                submission.getGithubUrl(),
                submission.getDemoUrl(),
                submission.getAdditionalNotes(),
                submission.getStatus(),
                submission.getSubmittedAt()
        );
    }
}
