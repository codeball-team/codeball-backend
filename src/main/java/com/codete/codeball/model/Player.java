package com.codete.codeball.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Player {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String description;

    private Player() {
    }

    public Player(String firstName, String lastName, String description) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
    }

}
