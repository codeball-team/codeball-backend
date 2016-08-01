package com.codeball.controllers.admin;

import com.codeball.model.Pitch;
import com.codeball.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/admin/pitch", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AdminPitchController {

    @Autowired
    private PitchRepository pitchRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Pitch> getPitches() {
        return pitchRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Pitch getPitchById(@PathVariable long id) {
        return pitchRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Pitch createPitch(@RequestBody Pitch pitch) {
        return pitchRepository.save(pitch);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Pitch updatePitch(@PathVariable long id, @RequestBody Pitch pitch) {
        pitch.setId(id);
        return pitchRepository.save(pitch);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deletePitch(@PathVariable long id) {
        pitchRepository.delete(id);
    }

}
