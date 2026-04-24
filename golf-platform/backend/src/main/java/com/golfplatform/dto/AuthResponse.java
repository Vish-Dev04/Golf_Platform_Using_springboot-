package com.golfplatform.dto;
import lombok.Data;

@Data
public class AuthResponse {
    private Long id;
    private String token;
    private String username;
    private String role;
    public AuthResponse(Long id, String token, String username, String role) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.role = role;
    }
}
