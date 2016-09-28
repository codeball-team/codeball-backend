package com.codeball.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GameScoreRequest {

    @Min(0)
    @JsonProperty("teamAScore")
    private int teamAScore;

    @Min(0)
    @JsonProperty("teamBScore")
    private int teamBScore;

    @JsonCreator
    public GameScoreRequest(@JsonProperty("teamAScore") int teamAScore,
                            @JsonProperty("teamBScore") int teamBScore) {
        this.teamAScore = teamAScore;
        this.teamBScore = teamBScore;
    }

}
