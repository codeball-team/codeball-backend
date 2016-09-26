package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TeamAssignment {

    @JsonProperty("teamA")
    private List<User> teamA;
    @JsonProperty("teamB")
    private List<User> teamB;

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
