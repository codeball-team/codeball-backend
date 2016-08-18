package com.codeball.exceptions;

public class UserEmailAlreadyExistsException extends RuntimeException {

    public UserEmailAlreadyExistsException(String email) {
        super("User with email: " + email + " already exists.");
    }
}
