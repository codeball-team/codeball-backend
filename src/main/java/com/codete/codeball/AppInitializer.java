package com.codete.codeball;

import com.codete.codeball.model.*;
import com.codete.codeball.repositories.GameRepository;
import com.codete.codeball.repositories.PitchRepository;
import com.codete.codeball.repositories.UserRepository;
import com.google.common.collect.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Set;

@Component
public class AppInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PitchRepository pitchRepository;

    @Transactional
    @Override
    public void run(String... strings) throws Exception {
        Pitch pitch1 = Pitch.builder()
                .name("Piastowska")
                .address("Piastowska 69")
                .minNumberOfPlayers(6)
                .maxNumberOfPlayers(6)
                .build();
        pitchRepository.save(pitch1);

        Pitch pitch2 = Pitch.builder()
                .name("Dywan na Filipa")
                .address("sw. Filipa 7")
                .minNumberOfPlayers(6)
                .maxNumberOfPlayers(10)
                .build();
        pitchRepository.save(pitch2);

        User user1 = User.builder()
                .firstName("Jan")
                .lastName("Janusz")
                .role("ROLE_ADMIN")
                .build();
        userRepository.save(user1);

        User user2 = User.builder()
                .firstName("Wincenty")
                .lastName("Pulapka")
                .role("ROLE_USER")
                .build();
        userRepository.save(user2);

        Game game1 = Game.builder()
                .dateTime(LocalDateTime.of(2016, Month.AUGUST, 24, 19, 0))
                .duration(Duration.ofHours(2))
                .pitch(pitch2)
                .build();
        gameRepository.save(game1);

        Set<Enrollment> enrollment = Sets.newHashSet();
        enrollment.add(Enrollment.builder().user(user1).enrollmentStatus(EnrollmentStatus.MAYBE).build());
        Game game2 = Game.builder()
                .dateTime(LocalDateTime.of(2016, Month.JUNE, 23, 18, 0))
                .duration(Duration.ofHours(2))
                .pitch(pitch1)
                .isEnrollmentOver(true)
                .enrollments(enrollment)
                .teamA(Sets.newHashSet(user1))
                .teamB(Sets.newHashSet(user2))
                .teamAScore(7)
                .teamBScore(71)
                .build();
        gameRepository.save(game2);
    }
}