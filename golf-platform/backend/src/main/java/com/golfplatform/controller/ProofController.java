package com.golfplatform.controller;

import com.golfplatform.model.Draw;
import com.golfplatform.model.User;
import com.golfplatform.model.WinnerProof;
import com.golfplatform.repository.DrawRepository;
import com.golfplatform.repository.UserRepository;
import com.golfplatform.repository.WinnerProofRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proofs")
@CrossOrigin(origins = "*")
public class ProofController {

    private final WinnerProofRepository winnerProofRepository;
    private final UserRepository userRepository;
    private final DrawRepository drawRepository;

    public ProofController(WinnerProofRepository winnerProofRepository, UserRepository userRepository, DrawRepository drawRepository) {
        this.winnerProofRepository = winnerProofRepository;
        this.userRepository = userRepository;
        this.drawRepository = drawRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<WinnerProof> uploadProof(@RequestBody Map<String, String> payload) {
        Long userId = Long.parseLong(payload.get("userId"));
        Long drawId = Long.parseLong(payload.get("drawId"));
        String base64Image = payload.get("image");

        User user = userRepository.findById(userId).orElseThrow();
        Draw draw = drawRepository.findById(drawId).orElseThrow();

        WinnerProof proof = new WinnerProof();
        proof.setUser(user);
        proof.setDraw(draw);
        proof.setProofImageBase64(base64Image);
        proof.setStatus("PENDING");

        return ResponseEntity.ok(winnerProofRepository.save(proof));
    }

    @GetMapping("/admin/pending")
    public ResponseEntity<List<WinnerProof>> getPendingProofs() {
        return ResponseEntity.ok(winnerProofRepository.findByStatus("PENDING"));
    }

    @PostMapping("/admin/{id}/status")
    public ResponseEntity<WinnerProof> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status"); // "APPROVED", "REJECTED", "PAID"
        WinnerProof proof = winnerProofRepository.findById(id).orElseThrow();
        proof.setStatus(status);
        return ResponseEntity.ok(winnerProofRepository.save(proof));
    }
}
