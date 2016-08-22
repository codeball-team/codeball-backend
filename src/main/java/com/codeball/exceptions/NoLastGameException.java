package com.codeball.exceptions;

public class NoLastGameException extends RuntimeException {

    public NoLastGameException() {
        super("Last game has not been found.");
    }

}
