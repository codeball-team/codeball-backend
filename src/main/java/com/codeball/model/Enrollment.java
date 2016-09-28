package com.codeball.model;

import com.codeball.repositories.resolvers.EntityByIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter(AccessLevel.NONE)
    @JsonIgnore
    private Long id;

    @NotNull
    @JsonIgnore
    @ManyToOne(targetEntity = Game.class, cascade = CascadeType.ALL)
    private Game game;

    @NotNull
    @JsonProperty("userId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    private User user;

    @NotNull
    @Setter
    @JsonProperty("enrollmentStatus")
    private EnrollmentStatus status;

    @Setter
    @NotNull
    @JsonProperty("enrollerId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    private User enroller;

    private Enrollment(Game game, User user, EnrollmentStatus status, User enroller) {
        this.game = game;
        this.user = user;
        this.status = status;
        this.enroller = enroller;
    }

    public static Enrollment create(Game game, User user, EnrollmentStatus status, User enroller) {
        return new Enrollment(game, user, status, enroller);
    }

    public Optional<Long> getId() {
        return Optional.ofNullable(id);
    }

}
