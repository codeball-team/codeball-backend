package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Pitch {

    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;

    @NotBlank
    @JsonProperty("name")
    private String name;

    @NotBlank
    @JsonProperty("address")
    private String address;

    @NotNull
    @JsonProperty("pitchType")
    @Enumerated(EnumType.STRING)
    private PitchType type;

    @Min(1)
    @JsonProperty("minNumberOfPlayers")
    private int minNumberOfPlayers;

    @JsonProperty("maxNumberOfPlayers")
    private int maxNumberOfPlayers;

    private Pitch(String name, String address, PitchType type, int minNumberOfPlayers, int maxNumberOfPlayers) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.minNumberOfPlayers = minNumberOfPlayers;
        this.maxNumberOfPlayers = maxNumberOfPlayers;
    }

    public static Pitch newPitch(String name, String address, PitchType type, int minNumberOfPlayers, int maxNumberOfPlayers) {
        return new Pitch(name, address, type, minNumberOfPlayers, maxNumberOfPlayers);
    }

    public Optional<Long> id() {
        return Optional.ofNullable(id);
    }

}