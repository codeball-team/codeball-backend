package com.codeball.controllers;

import com.codeball.model.Pitch;
import com.codeball.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/pitch", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class PitchController {

    @Autowired
    private PitchRepository pitchRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Pitch> listPitches() {
        return pitchRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Pitch getPitchById(@PathVariable long id) {
        return pitchRepository.findOne(id);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Pitch createPitch(@RequestBody Pitch pitch) {
        return pitchRepository.save(pitch);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Pitch updatePitch(@PathVariable long id, @RequestBody Pitch pitch) {
        pitch.setId(id);
        return pitchRepository.save(pitch);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deletePitch(@PathVariable long id) {
        pitchRepository.delete(id);
    }

}
