package com.codeball.controllers;

import com.codeball.model.User;
import com.codeball.model.UserRole;
import com.codeball.services.UserService;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController {

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public User getCurrentUser() {
        return securityContextUtils.getCurrentUser();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> listUsers() {
        return userService.listUsers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User createUser(@RequestBody User user) {
        if (user.getRole().equals(UserRole.ROLE_USER.name())) {
            return userService.createNormalUser(user);
        } else {
            return userService.createAnyUser(user);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User updateUser(@PathVariable long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

}
