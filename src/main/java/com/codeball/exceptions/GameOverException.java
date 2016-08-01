package com.codeball.exceptions;

public class GameOverException extends RuntimeException {

    public GameOverException(long gameId) {
        super("Game with ID " + gameId + " is over. You cannot modify it.");
    }
}
