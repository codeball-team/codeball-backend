package com.codete.codeball.controllers;

import com.codete.codeball.exceptions.EnrollmentOverException;
import com.codete.codeball.exceptions.GameOverException;
import com.codete.codeball.model.EnrollmentStatus;
import com.codete.codeball.model.Game;
import com.codete.codeball.model.TeamAssignment;
import com.codete.codeball.model.User;
import com.codete.codeball.repositories.GameRepository;
import com.codete.codeball.services.teams.TeamAssigner;
import com.codete.codeball.utils.ContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/game", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private TeamAssigner teamAssigner;

    @Autowired
    private ContextUtils contextUtils;

    @RequestMapping(value = "/last", method = RequestMethod.GET)
    public Game getLastGame() {
        return gameRepository.findLastGame();
    }

    @RequestMapping(value = "/upcoming", method = RequestMethod.GET)
    public Game getUpcomingGame() {
        return gameRepository.findUpcomingGame();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Game getGameById(@PathVariable long id) {
        return gameRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameRepository.findAll(new Sort(Sort.Direction.DESC, "startTimestamp"));
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Game setEnrollmentStatus(Principal principal, @PathVariable("id") long gameId, @RequestBody EnrollmentStatus status) {
        User currentUser = contextUtils.getUser(principal);
        Game game = gameRepository.findOne(gameId);
        if (game.isEnrollmentOver()) {
            throw new EnrollmentOverException(gameId);
        }
        game.enrollUser(currentUser, status);
        return game;
    }

    @RequestMapping(value = "/{id}/team", method = RequestMethod.PUT)
    public Game drawTeams(@PathVariable("id") long gameId) {
        Game game = gameRepository.findOne(gameId);
        drawTeams(game);
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}/finishEnrollment", method = RequestMethod.PUT)
    public Game finishEnrollment(@PathVariable("id") long gameId) {
        Game game = gameRepository.findOne(gameId);
        game.setEnrollmentOver(true);
        drawTeams(game);
        return gameRepository.save(game);
    }

    private void drawTeams(Game game) {
        if (game.isGameOver()) {
            throw new GameOverException(game.getId());
        }
        TeamAssignment teamAssignment = teamAssigner.assignTeams(game.getEnrolledUsers());
        game.assignTeams(teamAssignment);
    }

}
