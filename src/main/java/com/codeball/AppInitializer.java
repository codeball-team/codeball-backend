package com.codeball;

import com.codeball.model.*;
import com.codeball.repositories.GameRepository;
import com.codeball.repositories.PitchRepository;
import com.codeball.repositories.UserRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneOffset;

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
                .address("ul. Piastowska 69, Kraków")
                .minNumberOfPlayers(6)
                .maxNumberOfPlayers(6)
                .pitchType(PitchType.FIRM_GROUND)
                .build();
        pitchRepository.save(pitch1);

        Pitch pitch2 = Pitch.builder()
                .name("Dywan na Filipa")
                .address("ul. Św. Filipa 15, Kraków")
                .minNumberOfPlayers(6)
                .maxNumberOfPlayers(10)
                .pitchType(PitchType.HARD_GROUND)
                .build();
        pitchRepository.save(pitch2);

        User user1 = User.builder()
                .email("jan@janusz.com")
                .firstName("Jan")
                .lastName("Janusz")
                .role("ROLE_ADMIN")
                .build();
        userRepository.save(user1);

        User user2 = User.builder()
                .email("wincenty@pulapka")
                .pictureUrl("https://gpkt.files.wordpress.com/2008/05/012.jpg")
                .firstName("Wincenty")
                .lastName("Pulapka")
                .role("ROLE_USER")
                .build();
        userRepository.save(user2);

        Game game1 = Game.builder()
                .startTimestamp(LocalDateTime.of(2016, Month.JUNE, 23, 19, 0).toEpochSecond(ZoneOffset.UTC))
                .durationInMinutes(120)
                .pitch(pitch1)
                .enrollmentOver(false)
                .enrollments(Lists.newArrayList())
                .gameOver(false)
                .build();
        gameRepository.save(game1);
        game1.enrollUser(user1, EnrollmentStatus.MAYBE);
        game1.enrollUser(user2, EnrollmentStatus.YES);
        gameRepository.save(game1);

        Game game2 = Game.builder()
                .startTimestamp(LocalDateTime.of(2016, Month.AUGUST, 24, 19, 0).toEpochSecond(ZoneOffset.UTC))
                .durationInMinutes(90)
                .pitch(pitch2)
                .enrollmentOver(true)
                .enrollments(Lists.newArrayList())
                .gameOver(true)
                .teamA(Lists.newArrayList(user1))
                .teamB(Lists.newArrayList(user2))
                .teamAScore(7)
                .teamBScore(71)
                .build();
        gameRepository.save(game2);
    }
}