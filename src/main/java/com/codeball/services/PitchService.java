package com.codeball.services;

import com.codeball.model.Pitch;
import com.codeball.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PitchService {

    @Autowired
    private PitchRepository pitchRepository;

    public Iterable<Pitch> listPitches() {
        return pitchRepository.findAll();
    }

    public Pitch getPitchById(long id) {
        return pitchRepository.findOne(id);
    }

    public Pitch createPitch(Pitch pitch) {
        return pitchRepository.save(pitch);
    }

    public Pitch updatePitch(long id, Pitch pitch) {
        pitch.setId(id);
        return pitchRepository.save(pitch);
    }

    public void deletePitch(long id) {
        pitchRepository.delete(id);
    }

}
