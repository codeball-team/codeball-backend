
package com.codeball.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(long id) {
        super("User with ID " + id + " does not exists.");
    }

    public UserNotFoundException(String email) {
        super("User with email " + email + " does not exists.");
    }

}
