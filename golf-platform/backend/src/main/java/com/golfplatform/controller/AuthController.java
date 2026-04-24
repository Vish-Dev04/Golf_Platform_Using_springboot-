package com.golfplatform.controller;

import com.golfplatform.dto.AuthRequest;
import com.golfplatform.dto.AuthResponse;
import com.golfplatform.model.User;
import com.golfplatform.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Typically loaded from properties, but hardcoded for scaffolding
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        User user = authService.register(request);
        return ResponseEntity.ok(new AuthResponse(user.getId(), "MOCK-JWT-TOKEN", user.getUsername(), user.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        User user = authService.login(request);
        return ResponseEntity.ok(new AuthResponse(user.getId(), "MOCK-JWT-TOKEN", user.getUsername(), user.getRole()));
    }
}
