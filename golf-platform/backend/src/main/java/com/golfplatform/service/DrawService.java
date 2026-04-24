package com.golfplatform.service;

import com.golfplatform.model.*;
import com.golfplatform.repository.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DrawService {
    private final DrawRepository drawRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    public DrawService(DrawRepository drawRepository, SubscriptionRepository subscriptionRepository, ScoreRepository scoreRepository, UserRepository userRepository) {
        this.drawRepository = drawRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.scoreRepository = scoreRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> executeMonthlyDraw() {
        // Calculate total active subscribers
        List<Subscription> activeSubs = subscriptionRepository.findAll().stream()
            .filter(sub -> "ACTIVE".equals(sub.getStatus()))
            .collect(Collectors.toList());
            
        // Calculate Prize Pool (Assume $9.99 average sub * 40% to pool)
        double totalPool = activeSubs.size() * 9.99 * 0.40;
        
        // Generate 5 random winning numbers (1-45)
        List<Integer> winningNumbers = new ArrayList<>();
        Random rand = new Random();
        while (winningNumbers.size() < 5) {
            int num = rand.nextInt(45) + 1;
            if (!winningNumbers.contains(num)) {
                winningNumbers.add(num);
            }
        }
        
        // Find Winners
        List<User> match5 = new ArrayList<>();
        List<User> match4 = new ArrayList<>();
        List<User> match3 = new ArrayList<>();
        
        for (Subscription sub : activeSubs) {
            User user = sub.getUser();
            List<Score> userScores = scoreRepository.findByUserIdOrderByDatePlayedDesc(user.getId());
            // Get latest 5 scores
            List<Integer> userNumbers = userScores.stream().limit(5).map(Score::getStrokes).collect(Collectors.toList());
            
            long matchCount = userNumbers.stream().filter(winningNumbers::contains).count();
            if (matchCount == 5) match5.add(user);
            else if (matchCount == 4) match4.add(user);
            else if (matchCount == 3) match3.add(user);
        }
        
        Draw draw = new Draw();
        draw.setTitle("Monthly Draw - " + java.time.LocalDate.now().getMonth().name());
        draw.setDrawDate(java.time.LocalDate.now());
        draw.setStatus("COMPLETED");
        drawRepository.save(draw);

        Map<String, Object> result = new HashMap<>();
        result.put("winningNumbers", winningNumbers);
        result.put("totalPool", totalPool);
        result.put("match5Winners", match5.size());
        result.put("match4Winners", match4.size());
        result.put("match3Winners", match3.size());
        
        return result;
    }
}
