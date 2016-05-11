package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Game {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime dateTime;
    private Duration duration;
    @JsonProperty("pitchId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Pitch pitch;
    private boolean isEnrollmentOver = false;
    @JsonProperty("enrollmentIds")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Enrollment> enrollments = new HashSet<>();
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

}
