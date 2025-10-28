package com.lawfirm.backend;

public record Config(
    int serverPort,
    String dbHost,
    int dbPort,
    String dbName,
    String dbUser,
    String dbPassword,
    String jwtSecret,
    int jwtExpirationMinutes,
    String defaultAdminEmail,
    String defaultAdminPassword
) {
  public static Config fromEnv() {
    int port = parseInt(System.getenv("BACKEND_SERVER_PORT"), 8080);
    String dbHost = env("BACKEND_DB_HOST", "localhost");
    int dbPort = parseInt(System.getenv("BACKEND_DB_PORT"), 5432);
    String dbName = env("BACKEND_DB_NAME", "lawfirm");
    String dbUser = env("BACKEND_DB_USER", "lawfirm");
    String dbPassword = System.getenv("BACKEND_DB_PASSWORD");
    String jwtSecret = env("APP_JWT_SECRET", "change-me-change-me-change-me-change");
    int jwtExpiration = parseInt(System.getenv("APP_JWT_EXPIRATION_MINUTES"), 60);
    String adminEmail = env("BACKEND_ADMIN_DEFAULT_EMAIL", "admin@lawfirm.com");
    String adminPassword = env("BACKEND_ADMIN_DEFAULT_PASSWORD", "changeme");

    return new Config(
        port,
        dbHost,
        dbPort,
        dbName,
        dbUser,
        dbPassword,
        jwtSecret,
        jwtExpiration,
        adminEmail,
        adminPassword
    );
  }

  private static String env(String key, String fallback) {
    String value = System.getenv(key);
    return value == null || value.isBlank() ? fallback : value;
  }

  private static int parseInt(String maybeNumber, int fallback) {
    if (maybeNumber == null || maybeNumber.isBlank()) {
      return fallback;
    }
    try {
      return Integer.parseInt(maybeNumber.trim());
    } catch (NumberFormatException ex) {
      return fallback;
    }
  }
}
