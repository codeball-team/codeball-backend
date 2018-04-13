package com.codeball.controllers;

import com.codeball.exceptions.DemoVersionException;
import com.codeball.exceptions.ResourceNotFoundException;
import com.codeball.model.Pitch;
import com.codeball.model.annotations.security.AdminRoleRequired;
import com.codeball.services.PitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/pitch", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class PitchController {

    @Autowired
    private PitchService pitchService;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Pitch> listPitches() {
        return pitchService.listPitches();
    }

    @RequestMapping(value = "/{pitchId}", method = RequestMethod.GET)
    public Pitch getPitchById(@PathVariable("pitchId") long pitchId) {
        return pitchService.findPitchById(pitchId).orElseThrow(ResourceNotFoundException::new);
    }

    @AdminRoleRequired
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Pitch createPitch(@Valid @RequestBody Pitch pitch) {
        throw new DemoVersionException();
    }


    @AdminRoleRequired
    @RequestMapping(value = "/{pitchId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Pitch updatePitch(@PathVariable("pitchId") long pitchId, @Valid @RequestBody Pitch pitch) {
        throw new DemoVersionException();
    }

    @AdminRoleRequired
    @RequestMapping(value = "/{pitchId}", method = RequestMethod.DELETE)
    public void deletePitch(@PathVariable("pitchId") long pitchId) {
        throw new DemoVersionException();
    }

}
