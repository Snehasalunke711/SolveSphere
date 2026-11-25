
package solvesphere_backend.service;

import solvesphere_backend.dto.UserProfileResponse;
import solvesphere_backend.dto.UpdateProfileRequest;
import solvesphere_backend.entity.User;
import solvesphere_backend.repository.UserRepository;
import solvesphere_backend.repository.ProblemRepository;
import solvesphere_backend.repository.ParticipationRepository;
import solvesphere_backend.repository.SubmissionRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserProfileService {

    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final ParticipationRepository participationRepository;
    private final SubmissionRepository submissionRepository;

    public UserProfileService(
            UserRepository userRepository,
            ProblemRepository problemRepository,
            ParticipationRepository participationRepository,
            SubmissionRepository submissionRepository) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.participationRepository = participationRepository;
        this.submissionRepository = submissionRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return buildProfile(user);
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        return buildProfile(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(
            String email,
            UpdateProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        if ("owner".equalsIgnoreCase(user.getRole())) {
            user.setOrganization(clean(request.getOrganization()));
            user.setDomain(clean(request.getDomain()));
            user.setSummary(clean(request.getSummary()));
        } else {
            user.setOrganization(null);
            user.setDomain(null);
            user.setSummary(clean(request.getSummary()));
        }

        User savedUser = userRepository.save(user);

        return buildProfile(savedUser);
    }

    private String clean(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private UserProfileResponse buildProfile(User user) {
        Long userId = user.getId();

        long problemsCreated =
                problemRepository.countByOwnerId(userId);

        long problemsJoined =
                participationRepository.countByUserId(userId);

        long solutionsSubmitted =
                submissionRepository.countBySubmittedById(userId);

        long acceptedSolutions =
                submissionRepository.countBySubmittedByIdAndStatus(
                        userId,
                        "ACCEPTED"
                );

        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getOrganization(),
                user.getDomain(),
                user.getSummary(),
                user.getCreatedAt(),
                problemsCreated,
                problemsJoined,
                solutionsSubmitted,
                acceptedSolutions
        );
    }
}
