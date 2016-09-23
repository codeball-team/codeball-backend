package com.codeball.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.experimental.Tolerate;

@Getter
public class GameScoreRequest {

    @JsonProperty("teamAScore")
    private int teamAScore;
    @JsonProperty("teamBScore")
    private int teamBScore;
    private String jan = "kukulka";

    @JsonCreator
    public GameScoreRequest(@JsonProperty("teamAScore") int teamAScore,
                            @JsonProperty("teamBScore") int teamBScore) {
        this.teamAScore = teamAScore;
        this.teamBScore = teamBScore;
    }

    @Tolerate
    private GameScoreRequest() { }

}
