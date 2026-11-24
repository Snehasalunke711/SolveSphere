
package solvesphere_backend.repository;

import solvesphere_backend.entity.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipationRepository
        extends JpaRepository<Participation, Long> {

    boolean existsByUserIdAndProblemId(Long userId, Long problemId);

    Optional<Participation> findByUserIdAndProblemId(
            Long userId,
            Long problemId
    );

    List<Participation> findByProblemId(Long problemId);

    List<Participation> findByUserId(Long userId);

    long countByUserId(Long userId);
}
