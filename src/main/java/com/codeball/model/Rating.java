package com.codeball.model;

import com.codeball.repositories.EntityByIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @Tolerate
    private Rating() {
    }

}
