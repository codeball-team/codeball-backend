package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Game {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime dateTime;
    private Duration duration;
    @ManyToOne
    private Pitch pitch;
    private boolean isEnrollmentOver = false;
    @ElementCollection
    private Map<User, EnrollmentStatus> enrolledUsers = new HashMap<>();
    @ElementCollection
    private Set<User> teamA = new HashSet<>();
    private byte teamAScore;
    @ElementCollection
    private Set<User> teamB = new HashSet<>();
    private byte teamBScore;

    private Game() {
    }

    public Game(LocalDateTime dateTime, Duration duration, Pitch pitch, boolean isEnrollmentOver, Map<User, EnrollmentStatus> enrolledUsers, Set<User> teamA, byte teamAScore, Set<User> teamB, byte teamBScore) {
        this.dateTime = dateTime;
        this.duration = duration;
        this.pitch = pitch;
        this.isEnrollmentOver = isEnrollmentOver;
        this.enrolledUsers = enrolledUsers;
        this.teamA = teamA;
        this.teamAScore = teamAScore;
        this.teamB = teamB;
        this.teamBScore = teamBScore;
    }
}
