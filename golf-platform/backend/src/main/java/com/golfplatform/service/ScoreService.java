package com.golfplatform.service;

import com.golfplatform.model.Score;
import com.golfplatform.repository.ScoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {
    private final ScoreRepository scoreRepository;
    
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public List<Score> getScoresForUser(Long userId) {
        return scoreRepository.findByUserIdOrderByDatePlayedDesc(userId);
    }
    
    public Score saveScore(Score score) {
        if (score.getStrokes() < 1 || score.getStrokes() > 45) {
            throw new IllegalArgumentException("Score must be between 1 and 45");
        }
        
        java.util.Optional<Score> existing = scoreRepository.findByUserIdAndDatePlayed(score.getUser().getId(), score.getDatePlayed());
        if (existing.isPresent() && !existing.get().getId().equals(score.getId())) {
            throw new IllegalArgumentException("A score for this date already exists");
        }

        Score saved = scoreRepository.save(score);
        
        List<Score> allScores = scoreRepository.findByUserIdOrderByDatePlayedDesc(score.getUser().getId());
        while (allScores.size() > 5) {
            Score oldest = allScores.remove(allScores.size() - 1);
            scoreRepository.delete(oldest);
        }
        
        return saved;
    }
}
