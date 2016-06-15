package com.codete.codeball.controllers;

import com.codete.codeball.model.User;
import com.codete.codeball.model.UserRole;
import com.codete.codeball.repositories.UserRepository;
import com.codete.codeball.utils.ContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private ContextUtils contextUtils;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public User getCurrentUser(Principal principal) {
        return contextUtils.getUser(principal);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public User getUser(@PathVariable long id) {
        return userRepository.findOne(id);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public User createUser(@RequestBody User user) {
        user.setId(null);
        user.setRole(UserRole.ROLE_USER.name());
        return userRepository.save(user);
    }

}
