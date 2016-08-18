package com.codeball.controllers;

import com.codeball.exceptions.UserEmailAlreadyExistsException;
import com.codeball.model.User;
import com.codeball.model.UserRole;
import com.codeball.repositories.UserRepository;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController {

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public User getCurrentUser() {
        return securityContextUtils.getCurrentUser();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable long id) {
        return userRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public User createUser(@RequestBody User user) {
        User existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (Objects.isNull(existingUserByEmail)) {
            user.setId(null);
            user.setRole(UserRole.ROLE_USER.name());
            return userRepository.save(user);
        } else {
            throw new UserEmailAlreadyExistsException(user.getEmail());
        }
    }

}
