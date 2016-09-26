package com.codeball.model;

import com.codeball.repositories.resolvers.EntityByIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class Enrollment {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne(targetEntity = Game.class, cascade = CascadeType.ALL)
    private Game game;

    @JsonProperty("userId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    private User user;

    @Setter
    @JsonProperty("enrollmentStatus")
    private EnrollmentStatus enrollmentStatus;

    @Setter
    @JsonProperty("enrollerId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    private User enroller;

    public Enrollment(Game game, User user, EnrollmentStatus enrollmentStatus, User enroller) {
        this.game = game;
        this.user = user;
        this.enrollmentStatus = enrollmentStatus;
        this.enroller = enroller;
    }

    public Enrollment(Game game, User user, EnrollmentStatus enrollmentStatus) {
        this.game = game;
        this.user = user;
        this.enrollmentStatus = enrollmentStatus;
        this.enroller = user;
    }

}
