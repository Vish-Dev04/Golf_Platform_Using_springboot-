package com.golfplatform.repository;

import com.golfplatform.model.WinnerProof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WinnerProofRepository extends JpaRepository<WinnerProof, Long> {
    List<WinnerProof> findByUserId(Long userId);
    List<WinnerProof> findByStatus(String status);
}
