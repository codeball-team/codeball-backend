package com.codeball.controllers;

import com.codeball.exceptions.DemoVersionException;
import com.codeball.exceptions.UserNotFoundException;
import com.codeball.model.User;
import com.codeball.model.annotations.security.AdminRoleRequired;
import com.codeball.services.UserService;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController {

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public User getCurrentUser() {
        return securityContextUtils.currentUser();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> listUsers() {
        return userService.listUsers();
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public User getUserById(@PathVariable("userId") long userId) {
        return userService.findUserById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User createUser(@Valid @RequestBody User user) {
        if (user.hasRoleUser()) {
            return userService.createNormalUser(user);
        } else {
            return userService.createAnyUser(user);
        }
    }

    @AdminRoleRequired
    @RequestMapping(value = "/{userId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User updateUser(@PathVariable("userId") long userId, @Valid @RequestBody User user) {
        throw new DemoVersionException();
    }

    @AdminRoleRequired
    @RequestMapping(value = "/{userId}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("userId") long userId) {
        throw new DemoVersionException();
    }

}
