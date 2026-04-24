package com.golfplatform.dto;
import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String email;
    private String password;
    private Long charityId;
    private Integer charityPercentage;
}
