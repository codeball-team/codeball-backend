package com.codeball.exceptions;

public class AuthenticationException extends RuntimeException {

    public AuthenticationException() {
        super("You are not authenticated.");
    }

    public AuthenticationException(String message) {
        super(message);
    }

}
