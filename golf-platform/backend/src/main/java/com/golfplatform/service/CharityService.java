package com.golfplatform.service;

import com.golfplatform.model.Charity;
import com.golfplatform.repository.CharityRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CharityService {
    private final CharityRepository charityRepository;

    public CharityService(CharityRepository charityRepository) {
        this.charityRepository = charityRepository;
    }

    public List<Charity> getAllCharities() {
        return charityRepository.findAll();
    }

    public Charity saveCharity(Charity charity) {
        return charityRepository.save(charity);
    }

    public void deleteCharity(Long id) {
        charityRepository.deleteById(id);
    }
}
