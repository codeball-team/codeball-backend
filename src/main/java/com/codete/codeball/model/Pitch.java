package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
    private int minNumberOfPlayers;
    private int maxNumberOfPlayers;

    @Tolerate
    private Pitch() {
    }

}