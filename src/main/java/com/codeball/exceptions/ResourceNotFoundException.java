package com.codeball.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resource) {
        super("Not found: " + resource);
    }
}
