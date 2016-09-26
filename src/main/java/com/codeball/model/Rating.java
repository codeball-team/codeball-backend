package com.codeball.model;

import com.codeball.repositories.resolvers.EntityByIdResolver;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;
    @JsonProperty("gameId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = Game.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Game game;
    @JsonProperty("voterId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private User voter;
    @JsonProperty("playerId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private User player;

}
