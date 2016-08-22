package com.codeball.exceptions;

public class GameNotFoundException extends RuntimeException {

    public GameNotFoundException(long gameId) {
        super("Game " + gameId + " does not exists.");
    }

}
