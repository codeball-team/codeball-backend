package com.codete.codeball.model;

import com.codete.codeball.repositories.EntityByIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Game {

    @Id
    @Setter
    @GeneratedValue
    private Long id;
    private long startTimestamp;
    private int durationInMinutes;
    @JsonProperty("pitchId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = Pitch.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Pitch pitch;
    @Setter
    @JsonProperty("isEnrollmentOver")
    private boolean enrollmentOver = false;
    @JsonProperty("isGameOver")
    private boolean gameOver = false;
    @JsonProperty("enrollments")
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "enrollment_game", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "enrollment_id"))
    private Set<Enrollment> enrollments = new HashSet<>();
    @JsonProperty("teamAIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_game", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> teamA = new HashSet<>();
    private int teamAScore;
    @JsonProperty("teamBIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_game", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> teamB = new HashSet<>();
    private int teamBScore;

    @Tolerate
    private Game() {
    }

    @JsonIgnore
    public List<User> getEnrolledUsers() {
        return enrollments.stream()
                .filter(entry -> entry.getEnrollmentStatus().equals(EnrollmentStatus.YES))
                .map(Enrollment::getUser)
                .collect(Collectors.toList());
    }

    public void assignTeams(TeamAssignment teamAssignment) {
        this.teamA = teamAssignment.getTeamA();
        this.teamB = teamAssignment.getTeamB();
    }

    public void enrollUser(User user, EnrollmentStatus status) {
        Optional<Enrollment> userEnrollment = enrollments.stream().filter(enrollment -> enrollment.getUser().equals(user)).findFirst();
        if (userEnrollment.isPresent()) {
            userEnrollment.get().setEnrollmentStatus(status);
        } else {
            enrollments.add(new Enrollment(this, user, status));
        }
    }

}
