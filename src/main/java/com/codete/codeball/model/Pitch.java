package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Pitch {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private PitchType pitchType;
    private int minNumberOfPlayers;
    private int maxNumberOfPlayers;

    @Tolerate
    private Pitch() {
    }

}