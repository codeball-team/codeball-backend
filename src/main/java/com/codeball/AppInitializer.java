package com.codeball;

import com.codeball.model.*;
import com.codeball.repositories.GameRepository;
import com.codeball.repositories.PitchRepository;
import com.codeball.repositories.UserRepository;
import com.codeball.utils.development.DevelopmentProperties;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Month;

@Component
public class AppInitializer implements CommandLineRunner {

    @Autowired
    private DevelopmentProperties developmentProperties;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PitchRepository pitchRepository;

    @Transactional
    @Override
    public void run(String... strings) {
        if (developmentProperties.getDataInitializer().isEnabled()) {
            populateSampleData();
        }
    }

    private void populateSampleData() {
        Pitch pitch1 = Pitch.newPitch(
                "Piastowska",
                "ul. Piastowska 69, Kraków",
                PitchType.FIRM_GROUND,
                6,
                6);
        pitchRepository.save(pitch1);

        Pitch pitch2 = Pitch.newPitch(
                "Dywan na Filipa",
                "ul. Św. Filipa 15, Kraków",
                PitchType.HARD_GROUND,
                6,
                10);
        pitchRepository.save(pitch2);

        User user1 = User.newAdmin(
                "jan@janusz.com",
                "Jan",
                "Janusz");
        userRepository.save(user1);

        User user2 = User.newNormalUser(
                "wincenty@pulapka",
                "Wincenty",
                "Pulapka",
                "https://gpkt.files.wordpress.com/2008/05/012.jpg");
        userRepository.save(user2);

        Game game1 = Game.newGame(
                pitch1,
                LocalDateTime.of(2016, Month.JUNE, 23, 19, 0),
                120);
        gameRepository.save(game1);
        game1.enrollUser(user1, EnrollmentStatus.MAYBE);
        game1.enrollUser(user2, EnrollmentStatus.YES);
        gameRepository.save(game1);

        Game game2 = Game.newGame(pitch2, LocalDateTime.of(2016, Month.AUGUST, 24, 19, 0), 90);
        game2.assignTeams(new TeamAssignment(Lists.newArrayList(user1), Lists.newArrayList(user2)));
        game2.endGame();
        game2.setScore(7, 71);
        gameRepository.save(game2);
    }
}