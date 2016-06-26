package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Game {

    @Id
    @GeneratedValue
    private Long id;
    private long startTimestamp;
    private int durationInMinutes;
    @JsonProperty("pitchId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Pitch pitch;
    @JsonProperty("isEnrollmentOver")
    private boolean enrollmentOver = false;
    @JsonProperty("isGameOver")
    private boolean gameOver = false;
    @ElementCollection
    @JsonProperty("enrollmentIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Map<User, EnrollmentStatus> enrollments = new HashMap<>();
    @JsonProperty("teamAIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_game", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> teamA = new HashSet<>();
    private int teamAScore;
    @JsonProperty("teamBIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
        return enrollments.entrySet().stream()
                .filter(entry -> entry.getValue().equals(EnrollmentStatus.YES))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    public void assignTeams(TeamAssignment teamAssignment) {
        this.teamA = teamAssignment.getTeamA();
        this.teamB = teamAssignment.getTeamB();
    }

}
