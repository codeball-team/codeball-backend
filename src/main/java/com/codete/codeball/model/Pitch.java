package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Pitch {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String address;
    private byte minNumberOfPlayers;
    private byte maxNumberOfPlayers;

    private Pitch() {

    }

    public Pitch(String name, String address, byte minNumberOfPlayers, byte maxNumberOfPlayers) {
        this.name = name;
        this.address = address;
        this.minNumberOfPlayers = minNumberOfPlayers;
        this.maxNumberOfPlayers = maxNumberOfPlayers;
    }
}
