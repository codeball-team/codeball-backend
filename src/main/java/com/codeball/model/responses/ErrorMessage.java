package com.codeball.model.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ErrorMessage {

    @JsonProperty("isSilent")
    private boolean isSilent;

    @JsonProperty("message")
    private String message;

    public ErrorMessage(String message, boolean isSilent) {
        this.message = message;
        this.isSilent = isSilent;
    }

    public ErrorMessage(String message) {
        this(message, false);
    }

}
