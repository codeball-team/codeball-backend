
package com.codeball.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(long gameId) {
        super("User with ID " + gameId + " does not exists.");
    }

}
