package com.codeball.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
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

}
