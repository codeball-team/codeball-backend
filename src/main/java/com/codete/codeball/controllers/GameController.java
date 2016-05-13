package com.codete.codeball.controllers;

import com.codete.codeball.model.Game;
import com.codete.codeball.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @RequestMapping(value = "/last", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Game getLastGame() {
        return gameRepository.findLastGame();
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Game getGameById(@PathVariable long id) {
        return gameRepository.findOne(id);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameRepository.findAll(new Sort(Sort.Direction.DESC, "startTimestamp"));
    }

}
