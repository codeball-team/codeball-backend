package com.example;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class LoginController {

    @RequestMapping("/")
    public String hello() {
        return "Hello!";
    }

    @RequestMapping("/janusz")
    public String janusz() {
        return "Chyba Ty!";
    }

    @RequestMapping("login")
    public String login() {
        return "You are logged in!";
    }

}
