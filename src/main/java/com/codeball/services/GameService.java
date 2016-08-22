package com.codeball.services;

import com.codeball.exceptions.EnrollmentOverException;
import com.codeball.exceptions.GameNotFoundException;
import com.codeball.exceptions.GameOverException;
import com.codeball.exceptions.ResourceNotFoundException;
import com.codeball.model.EnrollmentStatus;
import com.codeball.model.Game;
import com.codeball.model.TeamAssignment;
import com.codeball.model.User;
import com.codeball.model.requests.GameScoreRequest;
import com.codeball.repositories.GameRepository;
import com.codeball.repositories.UserRepository;
import com.codeball.services.teams.TeamAssigner;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Objects;

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
        Game lastGame = gameRepository.findLastGame();
        if (lastGame == null) {
            throw new ResourceNotFoundException("last game");
        }
        return lastGame;
    }

    public Game getUpcomingGame() {
        Game upcomingGame = gameRepository.findUpcomingGame();
        if (upcomingGame == null) {
            throw new ResourceNotFoundException("upcoming game");
        }
        return upcomingGame;
    }

    public Game getGameById(@PathVariable long id) {
        Game game = gameRepository.findOne(id);
        if (game == null) {
            throw new ResourceNotFoundException("game with ID: " + id);
        }
        return game;
    }

    public Iterable<Game> getSortedGames() {
        return gameRepository.findAll(new Sort(Sort.Direction.DESC, "startTimestamp"));
    }

    @Transactional
    public Game setEnrollmentStatus(long gameId, long userId, EnrollmentStatus status) {
        User userToEnroll = userRepository.findOne(userId);
        Game game = gameRepository.findOne(gameId);
        if (game == null) {
            throw new ResourceNotFoundException("game with ID: " + gameId);
        }
        if (game.isEnrollmentOver()) {
            throw new EnrollmentOverException(gameId);
        }
        game.enrollUser(userToEnroll, status, securityContextUtils.getCurrentUser());
        return game;
    }

    public Game drawTeams(long gameId) {
        Game game = gameRepository.findOne(gameId);
        if (game == null) {
            throw new ResourceNotFoundException("game with ID: " + gameId);
        }
        drawTeams(game);
        return gameRepository.save(game);
    }

    public Game finishEnrollment(long gameId) {
        Game game = gameRepository.findOne(gameId);
        if (game == null) {
            throw new ResourceNotFoundException("game with ID: " + gameId);
        }
        game.setEnrollmentOver(true);
        drawTeams(game);
        return gameRepository.save(game);
    }

    public Game updateGameScore(long gameId, int teamAScore, int teamBScore) {
        Game game = gameRepository.findOne(gameId);
        if (game == null) {
            throw new ResourceNotFoundException("game with ID: " + gameId);
        }
        game.setScore(teamAScore, teamBScore);
        return gameRepository.save(game);
    }

    private void drawTeams(Game game) {
        if (game.isGameOver()) {
            throw new GameOverException(game.getId());
        }
        TeamAssignment teamAssignment = teamAssigner.assignTeams(game.getEnrolledUsers());
        game.assignTeams(teamAssignment);
    }

    public void deleteGame(long gameId) {
        gameRepository.delete(gameId);
    }

    public Game updateGame(long gameId, Game game) {
        game.setId(gameId);
        return gameRepository.save(game);
    }

    @Transactional
    public Game endGame(long gameId) {
        Game game = gameRepository.findOne(gameId);
        if (Objects.nonNull(game)) {
            game.setGameOver(true);
            return game;
        }
        throw new GameNotFoundException(gameId);
    }

    public Game createGame(Game game) {
        game.setId(null);
        return gameRepository.save(game);
    }
}
