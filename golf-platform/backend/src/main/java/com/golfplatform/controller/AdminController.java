package com.golfplatform.controller;

import com.golfplatform.model.User;
import com.golfplatform.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.golfplatform.service.DrawService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") 
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private DrawService drawService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PostMapping("/trigger-draw")
    public ResponseEntity<Map<String, Object>> triggerDraw() {
        return ResponseEntity.ok(drawService.executeMonthlyDraw());
    }
}
