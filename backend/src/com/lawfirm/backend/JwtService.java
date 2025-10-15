package com.lawfirm.backend;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public final class JwtService {
  private final byte[] secretKey;
  private final long expirationMinutes;

  public JwtService(String secret, long expirationMinutes) {
    if (secret == null || secret.length() < 32) {
      throw new IllegalArgumentException("JWT secret must be at least 32 characters long");
    }
    this.secretKey = secret.getBytes(StandardCharsets.UTF_8);
    this.expirationMinutes = expirationMinutes;
  }

  public String issueToken(AdminService.AdminUser user) {
    Instant now = Instant.now();
    Instant expiresAt = now.plusSeconds(expirationMinutes * 60L);

    String headerJson = JsonWriter.toJson(Map.of("alg", "HS256", "typ", "JWT"));
    String payloadJson = JsonWriter.toJson(Map.of(
        "sub", user.id(),
        "email", user.email(),
        "role", user.role(),
        "exp", expiresAt.getEpochSecond(),
        "iat", now.getEpochSecond()));

    String header = base64Url(headerJson.getBytes(StandardCharsets.UTF_8));
    String payload = base64Url(payloadJson.getBytes(StandardCharsets.UTF_8));
    String unsignedToken = header + '.' + payload;
    String signature = sign(unsignedToken);
    return unsignedToken + '.' + signature;
  }

  public Optional<AuthSession> verify(String token) {
    if (token == null || token.isBlank()) {
      return Optional.empty();
    }
    String[] parts = token.split("\\.");
    if (parts.length != 3) {
      return Optional.empty();
    }
    String header = new String(Base64.getUrlDecoder().decode(parts[0]), StandardCharsets.UTF_8);
    Object headerObj = JsonParser.parse(header);
    if (!(headerObj instanceof Map<?, ?> headerMap)) {
      return Optional.empty();
    }
    Object alg = headerMap.get("alg");
    if (!"HS256".equals(alg)) {
      return Optional.empty();
    }

    String unsignedToken = parts[0] + '.' + parts[1];
    String expectedSignature = sign(unsignedToken);
    if (!MessageDigest.isEqual(Base64.getUrlDecoder().decode(parts[2]), Base64.getUrlDecoder().decode(expectedSignature))) {
      return Optional.empty();
    }

    String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
    Object payloadObj = JsonParser.parse(payload);
    if (!(payloadObj instanceof Map<?, ?> map)) {
      return Optional.empty();
    }

    Object expValue = map.get("exp");
    long exp;
    if (expValue instanceof Number number) {
      exp = number.longValue();
    } else if (expValue instanceof String str) {
      try {
        exp = Long.parseLong(str);
      } catch (NumberFormatException ex) {
        return Optional.empty();
      }
    } else {
      return Optional.empty();
    }

    if (Instant.now().getEpochSecond() >= exp) {
      return Optional.empty();
    }

    String userId = stringValue(map.get("sub"));
    String email = stringValue(map.get("email"));
    String role = stringValue(map.get("role"));
    if (userId == null || email == null || role == null) {
      return Optional.empty();
    }

    return Optional.of(new AuthSession(userId, email, role));
  }

  private String sign(String data) {
    try {
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secretKey, "HmacSHA256"));
      byte[] signature = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
      return base64Url(signature);
    } catch (InvalidKeyException | java.security.NoSuchAlgorithmException ex) {
      throw new IllegalStateException("Unable to sign JWT", ex);
    }
  }

  private static String base64Url(byte[] data) {
    return Base64.getUrlEncoder().withoutPadding().encodeToString(data);
  }

  private static String stringValue(Object value) {
    if (value == null) {
      return null;
    }
    return String.valueOf(value);
  }

  public record AuthSession(String userId, String email, String role) {}
}
