package com.lawfirm.backend;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public final class PasswordHasher {
  private static final SecureRandom RANDOM = new SecureRandom();

  private PasswordHasher() {}

  public static String generateSalt() {
    byte[] salt = new byte[16];
    RANDOM.nextBytes(salt);
    return toHex(salt);
  }

  public static String hashPassword(String password, String saltHex) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      digest.update(fromHex(saltHex));
      digest.update(password.getBytes(StandardCharsets.UTF_8));
      byte[] hashed = digest.digest();
      return toHex(hashed);
    } catch (NoSuchAlgorithmException ex) {
      throw new IllegalStateException("SHA-256 algorithm is not available", ex);
    }
  }

  public static boolean verifyPassword(String password, String saltHex, String expectedHash) {
    String computed = hashPassword(password, saltHex);
    return constantTimeEquals(computed, expectedHash);
  }

  private static boolean constantTimeEquals(String a, String b) {
    if (a.length() != b.length()) {
      return false;
    }
    int result = 0;
    for (int i = 0; i < a.length(); i++) {
      result |= a.charAt(i) ^ b.charAt(i);
    }
    return result == 0;
  }

  private static byte[] fromHex(String hex) {
    int len = hex.length();
    byte[] data = new byte[len / 2];
    for (int i = 0; i < len; i += 2) {
      data[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4)
          + Character.digit(hex.charAt(i + 1), 16));
    }
    return data;
  }

  private static String toHex(byte[] data) {
    StringBuilder sb = new StringBuilder(data.length * 2);
    for (byte b : data) {
      sb.append(String.format("%02x", b));
    }
    return sb.toString();
  }
}
