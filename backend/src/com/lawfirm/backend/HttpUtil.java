package com.lawfirm.backend;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

public final class HttpUtil {
  private HttpUtil() {}

  public static String readBody(HttpExchange exchange) throws IOException {
    return new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
  }

  public static void writeJson(HttpExchange exchange, int statusCode, Object body) throws IOException {
    String json = body instanceof String str ? str : JsonWriter.toJson(body);
    byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
    Headers headers = exchange.getResponseHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");
    addCorsHeaders(headers);
    exchange.sendResponseHeaders(statusCode, bytes.length);
    try (OutputStream os = exchange.getResponseBody()) {
      os.write(bytes);
    }
  }

  public static void writeEmpty(HttpExchange exchange, int statusCode) throws IOException {
    Headers headers = exchange.getResponseHeaders();
    addCorsHeaders(headers);
    exchange.sendResponseHeaders(statusCode, -1);
  }

  public static void writeError(HttpExchange exchange, int statusCode, String message) throws IOException {
    writeJson(exchange, statusCode, Map.of("error", message));
  }

  public static void addCorsHeaders(Headers headers) {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  }

  public static String getAuthorizationToken(HttpExchange exchange) {
    List<String> values = exchange.getRequestHeaders().get("Authorization");
    if (values == null || values.isEmpty()) {
      return null;
    }
    for (String header : values) {
      if (header != null && header.toLowerCase().startsWith("bearer ")) {
        return header.substring(7).trim();
      }
    }
    return null;
  }
}
