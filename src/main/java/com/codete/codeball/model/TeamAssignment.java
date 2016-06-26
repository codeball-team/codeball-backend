package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;
import lombok.Getter;

import java.util.List;
import java.util.Set;

@Getter
public class TeamAssignment {

    @JsonProperty("teamA")
    private final Set<User> teamA;
    @JsonProperty("teamB")
    private final Set<User> teamB;

    public TeamAssignment(Set<User> teamA, Set<User> teamB) {
        this.teamA = teamA;
        this.teamB = teamB;
    }

    public TeamAssignment(List<User> teamA, List<User> teamB) {
        this.teamA = Sets.newLinkedHashSet(teamA);
        this.teamB = Sets.newLinkedHashSet(teamB);
    }

}
