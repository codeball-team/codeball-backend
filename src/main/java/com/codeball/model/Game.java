package com.codeball.model;

import com.codeball.repositories.resolvers.EntityByIdResolver;
import com.fasterxml.jackson.annotation.*;
import com.google.common.collect.Lists;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Entity
@Getter
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter
    @Getter(AccessLevel.NONE)
    @JsonProperty("id")
    private Long id;

    @NotNull
    @JsonProperty("startTimestamp")
    private LocalDateTime startTime;

    @Min(30)
    @JsonProperty("durationInMinutes")
    private int durationInMinutes;

    @NotNull
    @JsonProperty("pitchId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = Pitch.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Pitch pitch;

    @JsonProperty("isEnrollmentOver")
    private boolean enrollmentOver;

    @JsonProperty("isGameOver")
    private boolean gameOver;

    @NotNull
    @JsonProperty("enrollments")
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "enrollment_game", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "enrollment_id"))
    private List<Enrollment> enrollments;

    @JsonProperty("teamAIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "teamA", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> teamA;

    @Min(0)
    @JsonProperty("teamAScore")
    private int teamAScore;

    @JsonProperty("teamBIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", resolver = EntityByIdResolver.class, scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "teamB", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> teamB;

    @Min(0)
    @JsonProperty("teamBScore")
    private int teamBScore;

    private Game() {
        this.enrollments = Lists.newArrayList();
        this.teamA = Lists.newArrayList();
        this.teamB = Lists.newArrayList();
        this.enrollmentOver = false;
        this.gameOver = false;
    }

    private Game(Pitch pitch, LocalDateTime startTime, int durationInMinutes) {
        this();
        this.startTime = startTime;
        this.durationInMinutes = durationInMinutes;
        this.pitch = pitch;
    }

    public static Game newGame(Pitch pitch, @Future LocalDateTime startTime, int durationInMinutes) {
        return new Game(pitch, startTime, durationInMinutes);
    }

    public Optional<Long> id() {
        return Optional.ofNullable(id);
    }

    public List<User> getEnrolledUsers() {
        return enrollments.stream()
                .filter(entry -> entry.getStatus().equals(EnrollmentStatus.YES))
                .map(Enrollment::getUser)
                .collect(Collectors.toList());
    }

    public void assignTeams(TeamAssignment teamAssignment) {
        teamA.clear();
        teamA.addAll(teamAssignment.getTeamA());

        teamB.clear();
        teamB.addAll(teamAssignment.getTeamB());
    }

    public void enrollUser(User userToBeEnrolled, EnrollmentStatus status, User enroller) {
        Optional<Enrollment> userEnrollment = enrollments.stream().filter(enrollment -> enrollment.getUser().equals(userToBeEnrolled)).findFirst();
        if (userEnrollment.isPresent()) {
            userEnrollment.get().setStatus(status);
            userEnrollment.get().setEnroller(enroller);
        } else {
            enrollments.add(Enrollment.create(this, userToBeEnrolled, status, enroller));
        }
    }

    public void enrollUser(User user, EnrollmentStatus status) {
        enrollUser(user, status, user);
    }

    public void setScore(int teamAScore, int teamBScore) {
        this.teamAScore = teamAScore;
        this.teamBScore = teamBScore;
    }

    public TeamAssignment getTimeAssignment() {
        return new TeamAssignment(teamA, teamB);
    }

    public void endEnrollment() {
        this.enrollmentOver = true;
    }

    public void endGame() {
        endEnrollment();
        this.gameOver = true;
    }

}
