package com.golfplatform.controller;

import com.golfplatform.model.Charity;
import com.golfplatform.service.CharityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/charities")
@CrossOrigin(origins = "*")
public class CharityController {

    private final CharityService charityService;

    public CharityController(CharityService charityService) {
        this.charityService = charityService;
    }

    @GetMapping
    public ResponseEntity<List<Charity>> getAllCharities() {
        return ResponseEntity.ok(charityService.getAllCharities());
    }

    @PostMapping
    public ResponseEntity<Charity> addCharity(@RequestBody Charity charity) {
        return ResponseEntity.ok(charityService.saveCharity(charity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCharity(@PathVariable Long id) {
        charityService.deleteCharity(id);
        return ResponseEntity.ok().build();
    }
}
