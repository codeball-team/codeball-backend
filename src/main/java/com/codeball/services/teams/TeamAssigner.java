package com.codeball.services.teams;

import com.codeball.exceptions.GameOverException;
import com.codeball.model.Game;
import com.codeball.model.TeamAssignment;
import com.codeball.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeamAssigner {

    int MAX_NUMBER_OF_ATTEMPTS = 10;

    default void drawAndAssignNewTeams(Game game) {
        if (game.isGameOver()) {
            throw new GameOverException(game.getId());
        }

        TeamAssignment teamAssignment = assignTeams(game.getEnrolledUsers());
        if (game.getEnrolledUsers().size() > 1) {
            int i = 0;
            while(teamAssignment.equals(game.getTimeAssignment()) && i++ < MAX_NUMBER_OF_ATTEMPTS) {
                teamAssignment = assignTeams(game.getEnrolledUsers());
            }
        }
        game.assignTeams(teamAssignment);
    }

    TeamAssignment assignTeams(List<User> players);

}
