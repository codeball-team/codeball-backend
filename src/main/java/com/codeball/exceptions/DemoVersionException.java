package com.codeball.exceptions;

public class DemoVersionException extends RuntimeException {

  public DemoVersionException() {
    super("This operation is not permitted in demo version.");
  }

}
