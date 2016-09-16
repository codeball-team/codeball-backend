package com.codeball.model;

import com.codeball.repositories.resolvers.EntityByIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Builder
@Entity
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    @JsonIgnore
    @ManyToOne(targetEntity = Game.class, cascade = CascadeType.ALL)
    private Game game;

    @Getter
    @JsonProperty("userId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    private User user;

    @Getter
    @Setter
    @JsonProperty("enrollmentStatus")
    private EnrollmentStatus enrollmentStatus;

    @Setter
    @Getter
    @JsonProperty("enrollerId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    private User enroller;

    @Tolerate
    public Enrollment() {

    }

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
