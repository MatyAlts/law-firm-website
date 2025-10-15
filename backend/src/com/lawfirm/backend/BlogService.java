package com.lawfirm.backend;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

public final class BlogService {
  private final Database database;

  public BlogService(Database database) {
    this.database = database;
  }

  public String listPublicBlogs() {
    String sql = "SELECT COALESCE(json_agg(entry), '[]'::json)::text FROM (" +
        "SELECT json_build_object(" +
        "'id', id::text, " +
        "'title', title, " +
        "'slug', slug, " +
        "'summary', summary, " +
        "'content', content, " +
        "'authorName', author_name, " +
        "'createdAt', to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"'), " +
        "'updatedAt', to_char(updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"')" +
        ") AS entry FROM blog_posts ORDER BY created_at DESC" +
        ") ordered;";
    String result = database.queryJson(sql);
    return result == null || result.isBlank() ? "[]" : result;
  }

  public String getBlogBySlug(String slug) {
    if (slug == null || slug.isBlank()) {
      return null;
    }
    String sql = baseBlogSelect("slug = " + Database.quote(slug) + " LIMIT 1");
    return normalizeSingle(database.queryJson(sql));
  }

  public String getBlogById(String id) {
    if (id == null || id.isBlank()) {
      return null;
    }
    String sql = baseBlogSelect("id = " + Database.quote(id) + "::uuid LIMIT 1");
    return normalizeSingle(database.queryJson(sql));
  }

  public String createBlog(Map<String, Object> body) {
    String title = requiredString(body.get("title"), "El título es obligatorio");
    String slug = requiredString(body.get("slug"), "El slug es obligatorio");
    String summary = requiredString(body.get("summary"), "El resumen es obligatorio");
    String content = requiredString(body.get("content"), "El contenido es obligatorio");
    String authorName = optionalString(body.get("authorName"), "Equipo Legal");

    if (slugExists(slug)) {
      throw new HttpException(409, "El slug ya está en uso");
    }

    String id = UUID.randomUUID().toString();
    String now = DateTimeFormatter.ISO_INSTANT.format(Instant.now());

    String sql = "INSERT INTO blog_posts (id, title, slug, summary, content, author_name, created_at, updated_at) VALUES (" +
        Database.quote(id) + "::uuid, " +
        Database.quote(title) + ", " +
        Database.quote(slug) + ", " +
        Database.quote(summary) + ", " +
        Database.quote(content) + ", " +
        Database.quote(authorName) + ", " +
        Database.quote(now) + "::timestamptz, " +
        Database.quote(now) + "::timestamptz) " +
        "RETURNING row_to_json(t)::text FROM (" +
        selectBlogProjection("WHERE id = " + Database.quote(id) + "::uuid") +
        ") t;";

    String result = database.queryJson(sql);
    String normalized = normalizeSingle(result);
    if (normalized == null) {
      throw new IllegalStateException("No se pudo crear el blog");
    }
    return normalized;
  }

  public String updateBlog(String id, Map<String, Object> body) {
    if (id == null || id.isBlank()) {
      throw new HttpException(400, "ID inválido");
    }
    String existing = getBlogById(id);
    if (existing == null) {
      throw new HttpException(404, "Blog no encontrado");
    }

    String title = requiredString(body.get("title"), "El título es obligatorio");
    String slug = requiredString(body.get("slug"), "El slug es obligatorio");
    String summary = requiredString(body.get("summary"), "El resumen es obligatorio");
    String content = requiredString(body.get("content"), "El contenido es obligatorio");
    String authorName = optionalString(body.get("authorName"), "Equipo Legal");

    String existingIdForSlug = database.querySingleValue(
        "SELECT id::text FROM blog_posts WHERE slug = " + Database.quote(slug) + " AND id <> " + Database.quote(id) + "::uuid LIMIT 1;");
    if (existingIdForSlug != null) {
      throw new HttpException(409, "El slug ya está en uso");
    }

    String now = DateTimeFormatter.ISO_INSTANT.format(Instant.now());

    String sql = "UPDATE blog_posts SET " +
        "title = " + Database.quote(title) + ", " +
        "slug = " + Database.quote(slug) + ", " +
        "summary = " + Database.quote(summary) + ", " +
        "content = " + Database.quote(content) + ", " +
        "author_name = " + Database.quote(authorName) + ", " +
        "updated_at = " + Database.quote(now) + "::timestamptz " +
        "WHERE id = " + Database.quote(id) + "::uuid RETURNING row_to_json(t)::text FROM (" +
        selectBlogProjection("WHERE id = " + Database.quote(id) + "::uuid") +
        ") t;";

    String result = database.queryJson(sql);
    String normalized = normalizeSingle(result);
    if (normalized == null) {
      throw new IllegalStateException("No se pudo actualizar el blog");
    }
    return normalized;
  }

  public void deleteBlog(String id) {
    if (id == null || id.isBlank()) {
      throw new HttpException(400, "ID inválido");
    }
    String sql = "WITH deleted AS (DELETE FROM blog_posts WHERE id = " + Database.quote(id) + "::uuid RETURNING 1) " +
        "SELECT COUNT(*)::text FROM deleted;";
    String count = database.querySingleValue(sql);
    if (count == null || count.isBlank() || "0".equals(count.trim())) {
      throw new HttpException(404, "Blog no encontrado");
    }
  }

  private boolean slugExists(String slug) {
    String sql = "SELECT id::text FROM blog_posts WHERE slug = " + Database.quote(slug) + " LIMIT 1;";
    return database.querySingleValue(sql) != null;
  }

  private String selectBlogProjection(String whereClause) {
    return "SELECT id::text AS id, title, slug, summary, content, author_name AS \"authorName\", " +
        "to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS \"createdAt\", " +
        "to_char(updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS \"updatedAt\" " +
        "FROM blog_posts " + whereClause;
  }

  private String baseBlogSelect(String condition) {
    return selectBlogProjection("WHERE " + condition);
  }

  private String normalizeSingle(String result) {
    if (result == null || result.isBlank() || "null".equals(result)) {
      return null;
    }
    return result;
  }

  private String requiredString(Object value, String message) {
    String str = optionalString(value, null);
    if (str == null || str.isBlank()) {
      throw new HttpException(400, message);
    }
    return str;
  }

  private String optionalString(Object value, String fallback) {
    if (value == null) {
      return fallback;
    }
    String str = String.valueOf(value);
    return str == null || str.isBlank() ? fallback : str;
  }
}
