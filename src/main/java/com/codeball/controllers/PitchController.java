package com.codeball.controllers;

import com.codeball.model.Pitch;
import com.codeball.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/pitch", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class PitchController {

    @Autowired
    private PitchRepository pitchRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Pitch> getPitches() {
        return pitchRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Pitch getPitch(@PathVariable long id) {
        return pitchRepository.findOne(id);
    }

}
