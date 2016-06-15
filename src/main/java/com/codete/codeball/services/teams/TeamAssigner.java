package com.codete.codeball.services.teams;

import com.codete.codeball.model.TeamAssignment;
import com.codete.codeball.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeamAssigner {

    TeamAssignment assignTeams(List<User> players);

}
