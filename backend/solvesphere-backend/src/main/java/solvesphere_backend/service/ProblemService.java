
package solvesphere_backend.service;

import solvesphere_backend.dto.CreateProblemRequest;
import solvesphere_backend.dto.UpdateProblemRequest;
import solvesphere_backend.dto.ProblemResponse;
import solvesphere_backend.dto.OwnerProblemResponse;
import solvesphere_backend.entity.Problem;
import solvesphere_backend.entity.User;
import solvesphere_backend.repository.ProblemRepository;
import solvesphere_backend.repository.SubmissionRepository;
import solvesphere_backend.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Locale;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;

    public ProblemService(
            ProblemRepository problemRepository,
            UserRepository userRepository,
            SubmissionRepository submissionRepository) {

        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
        this.submissionRepository = submissionRepository;
    }

    private String getAuthenticatedEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        return authentication.getName();
    }

    private User getAuthenticatedUser() {
        String email = getAuthenticatedEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Logged-in user not found"));
    }

    private User requireOwnerRole() {
        User user = getAuthenticatedUser();

        if (!"owner".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only owners can perform this action");
        }

        return user;
    }

    private Problem getProblemOwnedByUser(Long id, String email) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem not found with ID: " + id));

        if (problem.getOwner() == null || !problem.getOwner().getEmail().equalsIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to modify this problem");
        }

        return problem;
    }

    public ProblemResponse createProblem(CreateProblemRequest request) {
        User owner = requireOwnerRole();

        Problem problem = new Problem();
        problem.setTitle(request.getTitle());
        problem.setDescription(request.getDescription());
        problem.setCategory(request.getCategory());
        problem.setDifficulty(request.getDifficulty());
        problem.setOwner(owner);

        Problem savedProblem = problemRepository.save(problem);

        return convertToResponse(savedProblem);
    }

    @Transactional(readOnly = true)
    public List<OwnerProblemResponse> getMyProblems() {
        User owner = requireOwnerRole();

        return problemRepository.findByOwnerIdOrderByCreatedAtDesc(owner.getId())
                .stream()
                .map(problem -> new OwnerProblemResponse(
                        problem.getId(),
                        problem.getTitle(),
                        problem.getCategory(),
                        problem.getStatus(),
                        submissionRepository.countByProblemId(problem.getId())
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProblemResponse> getAllProblems() {
        return getAllProblems(null, null, null, null, "newest");
    }

    @Transactional(readOnly = true)
    public List<ProblemResponse> getAllProblems(
            String search,
            String category,
            String difficulty,
            String status,
            String sortBy) {

        Specification<Problem> specification =
                (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

        if (search != null && !search.isBlank()) {
            String searchValue = "%" + search.trim().toLowerCase(Locale.ROOT) + "%";

            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.or(
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), searchValue),
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), searchValue)
                    ));
        }

        if (category != null && !category.isBlank()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("category")),
                            category.trim().toLowerCase(Locale.ROOT)
                    ));
        }

        if (difficulty != null && !difficulty.isBlank()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("difficulty")),
                            difficulty.trim().toLowerCase(Locale.ROOT)
                    ));
        }

        if (status != null && !status.isBlank()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("status")),
                            status.trim().toLowerCase(Locale.ROOT)
                    ));
        }

        String sortingOption = sortBy == null || sortBy.isBlank()
                ? "newest"
                : sortBy.trim().toLowerCase(Locale.ROOT);

        Sort sort;

        switch (sortingOption) {
            case "newest":
                sort = Sort.by(Sort.Direction.DESC, "createdAt");
                break;
            case "oldest":
                sort = Sort.by(Sort.Direction.ASC, "createdAt");
                break;
            case "title":
                sort = Sort.by(Sort.Direction.ASC, "title");
                break;
            case "difficulty":
                sort = Sort.by(Sort.Direction.ASC, "difficulty");
                break;
            default:
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid sort option. Use newest, oldest, title, or difficulty"
                );
        }

        return problemRepository.findAll(specification, sort)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProblemResponse getProblemById(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Problem not found with ID: " + id
                ));

        return convertToResponse(problem);
    }

    @Transactional
    public ProblemResponse updateProblem(Long id, UpdateProblemRequest request) {
        User owner = requireOwnerRole();
        Problem problem = getProblemOwnedByUser(id, owner.getEmail());

        problem.setTitle(request.getTitle());
        problem.setDescription(request.getDescription());
        problem.setCategory(request.getCategory());
        problem.setDifficulty(request.getDifficulty());

        Problem updatedProblem = problemRepository.save(problem);

        return convertToResponse(updatedProblem);
    }

    @Transactional
    public void deleteProblem(Long id) {
        User owner = requireOwnerRole();
        Problem problem = getProblemOwnedByUser(id, owner.getEmail());

        problemRepository.delete(problem);
    }

    private ProblemResponse convertToResponse(Problem problem) {
        return new ProblemResponse(
                problem.getId(),
                problem.getTitle(),
                problem.getDescription(),
                problem.getCategory(),
                problem.getDifficulty(),
                problem.getStatus(),
                problem.getOwner().getName(),
                problem.getCreatedAt()
        );
    }
}
