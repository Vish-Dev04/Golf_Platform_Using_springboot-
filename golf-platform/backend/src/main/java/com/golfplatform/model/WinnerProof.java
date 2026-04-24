package com.golfplatform.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "winner_proofs")
public class WinnerProof {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "draw_id", nullable = false)
    private Draw draw;

    @Lob
    @Column(name = "proof_image", columnDefinition = "CLOB")
    private String proofImageBase64;

    private String status; // "PENDING", "APPROVED", "REJECTED", "PAID"
}
