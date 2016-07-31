package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;
import lombok.Getter;

import java.util.List;
import java.util.Set;

@Getter
public class TeamAssignment {

    @JsonProperty("teamA")
    private final List<User> teamA;
    @JsonProperty("teamB")
    private final List<User> teamB;

    public TeamAssignment(List<User> teamA, List<User> teamB) {
        this.teamA = teamA;
        this.teamB = teamB;
    }

}
