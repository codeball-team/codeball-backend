package com.codeball.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super("Requested resource is unavailable.");
    }

    public ResourceNotFoundException(String resource) {
        super("Not found: " + resource);
    }

}
