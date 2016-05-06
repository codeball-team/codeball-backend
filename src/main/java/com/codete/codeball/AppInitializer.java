package com.codete.codeball;

import com.codete.codeball.model.EnrollmentStatus;
import com.codete.codeball.model.Game;
import com.codete.codeball.model.Pitch;
import com.codete.codeball.model.User;
import com.codete.codeball.repositories.GameRepository;
import com.codete.codeball.repositories.PitchRepository;
import com.codete.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.HashMap;
import java.util.HashSet;

@Component
public class AppInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PitchRepository pitchRepository;

    @Override
    public void run(String... strings) throws Exception {
        Pitch pitch1 = new Pitch("Piastowska", "Piastowska 69", (byte) 6, (byte) 20);
        Pitch pitch2 = new Pitch("Dywan na Filipa", "Filipa 7", (byte) 6, (byte) 10);
        pitchRepository.save(pitch1);
        pitchRepository.save(pitch2);

        Game game1 = new Game(LocalDateTime.of(2016, Month.AUGUST, 24, 19, 0), Duration.ofHours(2), pitch2, false, new HashMap<User, EnrollmentStatus>(), new HashSet<User>(), (byte) 0, new HashSet<User>(), (byte) 0);
        gameRepository.save(game1);

        User user1 = new User("Jan", "Janusz", "ROLE_ADMIN");
        User user2 = new User("Wincenty", "Pulapka", "ROLE_USER");
        userRepository.save(user1);
        userRepository.save(user2);
    }
}