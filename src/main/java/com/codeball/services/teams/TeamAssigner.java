package com.codeball.services.teams;

import com.codeball.model.TeamAssignment;
import com.codeball.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeamAssigner {

    TeamAssignment assignTeams(List<User> players);

}
