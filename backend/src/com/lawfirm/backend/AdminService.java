package com.lawfirm.backend;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

public final class AdminService {
  private final Database database;
  private final Config config;

  public AdminService(Database database, Config config) {
    this.database = database;
    this.config = config;
  }

  public void ensureDefaultAdmin() {
    if (findAdminByEmail(config.defaultAdminEmail()) == null) {
      createAdmin(config.defaultAdminEmail(), config.defaultAdminPassword(), "superadmin");
    }
  }

  public AdminUser authenticate(String email, String password) {
    AdminCredentials credentials = findAdminByEmail(email);
    if (credentials == null) {
      return null;
    }
    boolean valid = PasswordHasher.verifyPassword(password, credentials.salt(), credentials.passwordHash());
    if (!valid) {
      return null;
    }
    return new AdminUser(credentials.id(), credentials.email(), credentials.role(), credentials.createdAt());
  }

  public String listAdminsJson() {
    String sql = "SELECT COALESCE(json_agg(entry), '[]'::json)::text FROM (" +
        "SELECT json_build_object(" +
        "'id', id::text, " +
        "'email', email, " +
        "'role', role, " +
        "'createdAt', to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"')" +
        ") AS entry FROM admin_users ORDER BY created_at DESC" +
        ") ordered;";
    String result = database.queryJson(sql);
    return result == null || result.isBlank() ? "[]" : result;
  }

  public String createAdminJson(String email, String password, String role) {
    if (email == null || email.isBlank() || password == null || password.isBlank()) {
      throw new HttpException(400, "Email y contraseña son obligatorios");
    }
    if (role == null || role.isBlank()) {
      role = "editor";
    }
    if (findAdminByEmail(email) != null) {
      throw new HttpException(409, "El correo ya está registrado");
    }

    String id = UUID.randomUUID().toString();
    String salt = PasswordHasher.generateSalt();
    String hash = PasswordHasher.hashPassword(password, salt);
    String createdAt = DateTimeFormatter.ISO_INSTANT.format(Instant.now());

    String sql = "INSERT INTO admin_users (id, email, password_hash, salt, role, created_at) VALUES (" +
        Database.quote(id) + ", " +
        Database.quote(email) + ", " +
        Database.quote(hash) + ", " +
        Database.quote(salt) + ", " +
        Database.quote(role) + ", " +
        Database.quote(createdAt) + "::timestamptz) RETURNING row_to_json(t)::text FROM (" +
        "SELECT id::text AS id, email, role, to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS \"createdAt\" " +
        "FROM admin_users WHERE id = " + Database.quote(id) +
        ") t;";

    String result = database.queryJson(sql);
    if (result == null || result.isBlank() || "null".equals(result)) {
      throw new IllegalStateException("No se pudo crear el administrador");
    }
    return result;
  }

  private AdminCredentials findAdminByEmail(String email) {
    if (email == null || email.isBlank()) {
      return null;
    }
    String sql = "SELECT COALESCE(row_to_json(t), 'null'::json)::text FROM (" +
        "SELECT id::text AS id, email, password_hash, salt, role, to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS createdAt " +
        "FROM admin_users WHERE email = " + Database.quote(email) + " LIMIT 1" +
        ") t;";
    String result = database.queryJson(sql);
    if (result == null || result.isBlank() || "null".equals(result)) {
      return null;
    }
    Map<String, Object> json = JsonParser.parseObject(result);
    return new AdminCredentials(
        String.valueOf(json.get("id")),
        String.valueOf(json.get("email")),
        String.valueOf(json.get("role")),
        String.valueOf(json.get("password_hash")),
        String.valueOf(json.get("salt")),
        String.valueOf(json.get("createdAt")));
  }

  public record AdminUser(String id, String email, String role, String createdAt) {}

  private record AdminCredentials(
      String id,
      String email,
      String role,
      String passwordHash,
      String salt,
      String createdAt) {
  }

  private void createAdmin(String email, String password, String role) {
    createAdminJson(email, password, role);
  }
}
