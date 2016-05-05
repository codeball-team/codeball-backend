package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Data
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
    private Map<User, EnrollmentStatus> enrolledUsers;
    private Set<User> teamA;
    private byte teamAScore;
    private Set<User> teamB;
    private byte teamBScore;

}
