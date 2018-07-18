package com.codeball.services;

import com.codeball.model.Pitch;
import com.codeball.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PitchService {

    @Autowired
    private PitchRepository pitchRepository;

    public Iterable<Pitch> listPitches() {
        return pitchRepository.findAll();
    }

    public Optional<Pitch> findPitchById(long id) {
        return pitchRepository.findById(id);
    }

    public Pitch createPitch(Pitch pitch) {
        return pitchRepository.save(pitch);
    }

    public Pitch updatePitch(long id, Pitch pitch) {
        pitch.setId(id);
        return pitchRepository.save(pitch);
    }

    public void deletePitch(long id) {
        pitchRepository.deleteById(id);
    }

}
