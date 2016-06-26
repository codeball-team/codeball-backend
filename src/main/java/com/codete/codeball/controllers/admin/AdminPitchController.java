package com.codete.codeball.controllers.admin;

import com.codete.codeball.model.Pitch;
import com.codete.codeball.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/admin/pitch")
public class AdminPitchController {

    @Autowired
    private PitchRepository pitchRepository;

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Iterable<Pitch> getPitches() {
        return pitchRepository.findAll();
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Pitch getPitchById(@PathVariable long id) {
        return pitchRepository.findOne(id);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public Pitch createPitch(@RequestBody Pitch pitch) {
        return pitchRepository.save(pitch);
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    public Pitch updatePitch(@PathVariable long id, @RequestBody Pitch pitch) {
        pitch.setId(id);
        return pitchRepository.save(pitch);
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    public void deletePitch(@PathVariable long id) {
        pitchRepository.delete(id);
    }

}
