package com.golfplatform.config;

import com.golfplatform.model.User;
import com.golfplatform.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Optional<User> admin = userRepository.findByUsername("admin");
        if (admin.isEmpty()) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword("admin123");
            adminUser.setEmail("admin@golfplatform.com");
            adminUser.setRole("ROLE_ADMIN");
            userRepository.save(adminUser);
            System.out.println("Default Admin User generated: admin / admin123");
        }
    }
}
