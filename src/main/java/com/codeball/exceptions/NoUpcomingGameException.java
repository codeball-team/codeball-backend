package com.codeball.exceptions;

public class NoUpcomingGameException extends RuntimeException {

    public NoUpcomingGameException() {
        super("There are no upcoming games.");
    }

}
