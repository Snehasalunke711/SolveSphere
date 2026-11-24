
package solvesphere_backend.service;

import solvesphere_backend.dto.ParticipationResponse;
import solvesphere_backend.entity.Participation;
import solvesphere_backend.entity.Problem;
import solvesphere_backend.entity.User;
import solvesphere_backend.repository.ParticipationRepository;
import solvesphere_backend.repository.ProblemRepository;
import solvesphere_backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ParticipationService {

    private final ParticipationRepository participationRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    public ParticipationService(
            ParticipationRepository participationRepository,
            ProblemRepository problemRepository,
            UserRepository userRepository) {

        this.participationRepository = participationRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                "anonymousUser".equals(authentication.getName())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User is not authenticated"
            );
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Logged-in user not found"
                        ));
    }

    private Problem getProblem(Long problemId) {

        return problemRepository.findById(problemId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Problem not found with ID: " + problemId
                        ));
    }

    @Transactional
    public ParticipationResponse joinProblem(Long problemId) {

        User user = getAuthenticatedUser();
        Problem problem = getProblem(problemId);

        if (!"OPEN".equalsIgnoreCase(problem.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This problem is not open for participation"
            );
        }

        if (problem.getOwner().getId().equals(user.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Problem owners cannot join their own problems"
            );
        }

        if (participationRepository.existsByUserIdAndProblemId(
                user.getId(), problemId)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You have already joined this problem"
            );
        }

        Participation participation = new Participation();
        participation.setUser(user);
        participation.setProblem(problem);

        Participation savedParticipation =
                participationRepository.save(participation);

        return convertToResponse(savedParticipation);
    }

    @Transactional
    public void leaveProblem(Long problemId) {

        User user = getAuthenticatedUser();

        getProblem(problemId);

        Participation participation =
                participationRepository.findByUserIdAndProblemId(
                        user.getId(),
                        problemId
                ).orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "You have not joined this problem"
                        ));

        participationRepository.delete(participation);
    }

    @Transactional(readOnly = true)
    public List<ParticipationResponse> getParticipants(Long problemId) {

        getProblem(problemId);

        return participationRepository.findByProblemId(problemId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private ParticipationResponse convertToResponse(
            Participation participation) {

        User user = participation.getUser();

        return new ParticipationResponse(
                participation.getId(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                participation.getJoinedAt()
        );
    }
}
