package com.codete.codeball;

import com.codete.codeball.model.Player;
import com.codete.codeball.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Test implements CommandLineRunner {

    private final PlayerRepository repository;

    @Autowired
    public Test(PlayerRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        System.out.println("Frodo");
        this.repository.save(new Player("Frodo", "Baggins", "ring bearer"));
    }
}