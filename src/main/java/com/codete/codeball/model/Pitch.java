package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Pitch {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String address;
    private short minNumberOfPlayers;
    private short maxNumberOfPlayers;

}
