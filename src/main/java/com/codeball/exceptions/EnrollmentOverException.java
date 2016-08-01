package com.codeball.exceptions;

public class EnrollmentOverException extends RuntimeException {

    public EnrollmentOverException(long gameId) {
        super("Enrollment for game " + gameId + " is over.");
    }
}
