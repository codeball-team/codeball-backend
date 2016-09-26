package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Pitch {

    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("address")
    private String address;
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private PitchType type;
    @JsonProperty("minNumberOfPlayers")
    private int minNumberOfPlayers;
    @JsonProperty("maxNumberOfPlayers")
    private int maxNumberOfPlayers;

    @Tolerate
    public Pitch() {}

    public Pitch(String name, String address, PitchType type, int minNumberOfPlayers, int maxNumberOfPlayers) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.minNumberOfPlayers = minNumberOfPlayers;
        this.maxNumberOfPlayers = maxNumberOfPlayers;
    }

}