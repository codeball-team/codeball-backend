package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.List;

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

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        TeamAssignment that = (TeamAssignment) object;
        return new EqualsBuilder()
                .append(teamA, that.teamA)
                .append(teamB, that.teamB)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(teamA)
                .append(teamB)
                .toHashCode();
    }

}
