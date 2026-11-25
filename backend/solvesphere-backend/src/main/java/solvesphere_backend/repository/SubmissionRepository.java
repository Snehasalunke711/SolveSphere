
package solvesphere_backend.repository;

import solvesphere_backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findByProblemId(Long problemId);

    List<Submission> findBySubmittedById(Long userId);

    Optional<Submission> findByIdAndSubmittedById(Long submissionId, Long userId);

    boolean existsByProblemIdAndStatus(Long problemId, String status);

    boolean existsByProblemIdAndSubmittedById(Long problemId, Long userId);

    Optional<Submission> findByProblemIdAndStatus(Long problemId, String status);

    long countBySubmittedById(Long userId);

    long countBySubmittedByIdAndStatus(Long userId, String status);

    long countByProblemId(Long problemId);
}
