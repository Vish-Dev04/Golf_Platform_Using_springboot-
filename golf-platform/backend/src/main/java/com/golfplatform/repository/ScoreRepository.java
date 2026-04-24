package com.golfplatform.repository;

import com.golfplatform.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUserIdOrderByDatePlayedDesc(Long userId);
    java.util.Optional<Score> findByUserIdAndDatePlayed(Long userId, java.time.LocalDate datePlayed);
}
