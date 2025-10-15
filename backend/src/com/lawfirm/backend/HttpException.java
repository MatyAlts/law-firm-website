package com.lawfirm.backend;

public class HttpException extends RuntimeException {
  private final int statusCode;

  public HttpException(int statusCode, String message) {
    super(message);
    this.statusCode = statusCode;
  }

  public int statusCode() {
    return statusCode;
  }
}
