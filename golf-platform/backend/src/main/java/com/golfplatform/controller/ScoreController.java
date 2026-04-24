package com.golfplatform.controller;

import com.golfplatform.model.Score;
import com.golfplatform.service.ScoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {
    
    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Score>> getScores(@PathVariable Long userId) {
        return ResponseEntity.ok(scoreService.getScoresForUser(userId));
    }

    @PostMapping
    public ResponseEntity<Score> addScore(@RequestBody Score score) {
        return ResponseEntity.ok(scoreService.saveScore(score));
    }
}
