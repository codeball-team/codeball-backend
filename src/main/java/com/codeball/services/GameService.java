package com.codeball.services;

import com.codeball.exceptions.EnrollmentOverException;
import com.codeball.exceptions.NoLastGameException;
import com.codeball.exceptions.NoUpcomingGameException;
import com.codeball.model.EnrollmentStatus;
import com.codeball.model.Game;
import com.codeball.model.User;
import com.codeball.repositories.GameRepository;
import com.codeball.repositories.UserRepository;
import com.codeball.services.teams.TeamAssigner;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamAssigner teamAssigner;

    @Autowired
    private SecurityContextUtils securityContextUtils;

    public Game getLastGame() {
        Optional<Game> lastGame = gameRepository.findLastGame();
        return lastGame.orElseThrow(NoLastGameException::new);
    }

    public Game getUpcomingGame() {
        Optional<Game> upcomingGame = gameRepository.findUpcomingGame();
        return upcomingGame.orElseThrow(NoUpcomingGameException::new);
    }

    public Game getGameById(long id) {
        return gameRepository.getById(id);
    }

    public Iterable<Game> getSortedGames() {
        return gameRepository.findAllByOrderByStartTimeDesc();
    }

    @Transactional(noRollbackFor = EnrollmentOverException.class)
    public Game setEnrollmentStatus(long gameId, long userId, EnrollmentStatus status) {
        User userToEnroll = userRepository.getById(userId);
        Game game = gameRepository.getById(gameId);
        if (game.isEnrollmentOver()) {
            throw new EnrollmentOverException(gameId);
        }
        game.enrollUser(userToEnroll, status, securityContextUtils.currentUser());
        return game;
    }

    public Game drawTeams(long gameId) {
        Game game = gameRepository.getById(gameId);
        teamAssigner.drawAndAssignNewTeams(game);
        return gameRepository.save(game);
    }

    public Game finishEnrollment(long gameId) {
        Game game = gameRepository.getById(gameId);
        game.endEnrollment();
        teamAssigner.drawAndAssignNewTeams(game);
        return gameRepository.save(game);
    }

    public Game updateGameScore(long gameId, int teamAScore, int teamBScore) {
        Game game = gameRepository.getById(gameId);
        game.setScore(teamAScore, teamBScore);
        return gameRepository.save(game);
    }

    public void deleteGame(long gameId) {
        gameRepository.deleteById(gameId);
    }

    public Game updateGame(long gameId, Game game) {
        game.setId(gameId);
        return gameRepository.save(game);
    }

    @Transactional
    public Game endGame(long gameId) {
        Game game = gameRepository.getById(gameId);
        game.endGame();
        return game;
    }

    public Game createGame(Game game) {
        game.setId(null);
        return gameRepository.save(game);
    }

}
