package com.codete.codeball.services.teams;

import com.codete.codeball.model.TeamAssignment;
import com.codete.codeball.model.User;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RandomTeamAssigner implements TeamAssigner {

    @Override
    public TeamAssignment assignTeams(List<User> players) {
        List<User> playersToAssign = Lists.newArrayList(players);
        int teamSize = players.size() / 2;
        Collections.shuffle(playersToAssign);
        return new TeamAssignment(
                playersToAssign.subList(teamSize, playersToAssign.size()),
                playersToAssign.subList(0, teamSize));
    }

}
