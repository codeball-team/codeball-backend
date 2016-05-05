package com.codete.codeball;

import com.codete.codeball.model.User;
import com.codete.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Test implements CommandLineRunner {

    private final UserRepository repository;

    @Autowired
    public Test(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        System.out.println("Frodo");
        this.repository.save(new User("Frodo", "Baggins", "ring bearer"));
        this.repository.save(new User("Janusz", "Baggins", "ring bearer"));
        this.repository.save(new User("Witkacy", "Baggins", "ring bearer"));
    }
}