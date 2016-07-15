package com.codete.codeball.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class GameScoreRequest {

    @JsonProperty("teamAScore")
    private final int teamAScore;
    @JsonProperty("teamBScore")
    private final int teamBScore;

    public GameScoreRequest(@JsonProperty("teamAScore") int teamAScore, @JsonProperty("teamAScore") int teamBScore) {
        this.teamAScore = teamAScore;
        this.teamBScore = teamBScore;
    }

}
