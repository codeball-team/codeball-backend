package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Data
@Builder
@Entity
public class Pitch {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("address")
    private String address;
    @JsonProperty("pitchType")
    @Enumerated(EnumType.STRING)
    private PitchType pitchType;
    @JsonProperty("minNumberOfPlayers")
    private int minNumberOfPlayers;
    @JsonProperty("maxNumberOfPlayers")
    private int maxNumberOfPlayers;

    @Tolerate
    private Pitch() {
    }

}