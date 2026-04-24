package com.golfplatform.service;

import com.golfplatform.dto.AuthRequest;
import com.golfplatform.model.User;
import com.golfplatform.model.Charity;
import com.golfplatform.repository.UserRepository;
import com.golfplatform.repository.CharityRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final CharityRepository charityRepository;

    public AuthService(UserRepository userRepository, CharityRepository charityRepository) {
        this.userRepository = userRepository;
        this.charityRepository = charityRepository;
    }

    public User register(AuthRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // NOTE: Add hashing later
        user.setRole("ROLE_USER");
        
        if (request.getCharityId() != null) {
            Charity charity = charityRepository.findById(request.getCharityId()).orElse(null);
            user.setCharity(charity);
            user.setCharityPercentage(request.getCharityPercentage() != null ? Math.max(10, request.getCharityPercentage()) : 10);
        }
        
        return userRepository.save(user);
    }

    public User login(AuthRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(request.getPassword())) {
            return optionalUser.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
}
