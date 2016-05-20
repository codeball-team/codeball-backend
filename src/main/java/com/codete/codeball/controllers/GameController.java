package com.codete.codeball.controllers;

import com.codete.codeball.exceptions.EnrollmentOverException;
import com.codete.codeball.model.EnrollmentStatus;
import com.codete.codeball.model.Game;
import com.codete.codeball.model.User;
import com.codete.codeball.repositories.GameRepository;
import com.codete.codeball.utils.ContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ContextUtils contextUtils;

    @RequestMapping(value = "/last", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Game getLastGame() {
        return gameRepository.findLastGame();
    }

    @RequestMapping(value = "/upcoming", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Game getUpcomingGame() {
        return gameRepository.findUpcomingGame();
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Game getGameById(@PathVariable long id) {
        return gameRepository.findOne(id);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameRepository.findAll(new Sort(Sort.Direction.DESC, "startTimestamp"));
    }

    @Transactional
    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    public Game setEnrollmentStatus(Principal principal, @PathVariable("id") long gameId, @RequestBody EnrollmentStatus status) {
        User currentUser = contextUtils.getUser(principal);
        Game game = gameRepository.findOne(gameId);
        if (game.isEnrollmentOver()) {
            throw new EnrollmentOverException(gameId);
        }
        game.getEnrollments().put(currentUser, status);
        return game;
    }

}
