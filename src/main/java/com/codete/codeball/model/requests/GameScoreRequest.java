package com.codete.codeball.model.requests;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.experimental.Tolerate;

@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class GameScoreRequest {

    @JsonProperty("teamAScore")
    private int teamAScore;
    @JsonProperty("teamBScore")
    private int teamBScore;

    public GameScoreRequest(int teamAScore, int teamBScore) {
        this.teamAScore = teamAScore;
        this.teamBScore = teamBScore;
    }

    @Tolerate
    private GameScoreRequest() {
    }

}
