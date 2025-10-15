package com.lawfirm.backend;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class Database {
  private final Config config;

  public Database(Config config) {
    this.config = config;
  }

  public void initialize() {
    StringBuilder sql = new StringBuilder();
    sql.append("CREATE TABLE IF NOT EXISTS admin_users (\n")
        .append("  id UUID PRIMARY KEY,\n")
        .append("  email TEXT NOT NULL UNIQUE,\n")
        .append("  password_hash TEXT NOT NULL,\n")
        .append("  salt TEXT NOT NULL,\n")
        .append("  role TEXT NOT NULL,\n")
        .append("  created_at TIMESTAMPTZ NOT NULL\n")
        .append(");\n");

    sql.append("CREATE TABLE IF NOT EXISTS blog_posts (\n")
        .append("  id UUID PRIMARY KEY,\n")
        .append("  title TEXT NOT NULL,\n")
        .append("  slug TEXT NOT NULL UNIQUE,\n")
        .append("  summary TEXT NOT NULL,\n")
        .append("  content TEXT NOT NULL,\n")
        .append("  author_name TEXT NOT NULL,\n")
        .append("  created_at TIMESTAMPTZ NOT NULL,\n")
        .append("  updated_at TIMESTAMPTZ NOT NULL\n")
        .append(");");

    execute(sql.toString());
  }

  public void execute(String sql) {
    runCommand(sql, false);
  }

  public String queryJson(String sql) {
    return runCommand(sql, true);
  }

  public String querySingleValue(String sql) {
    String output = runCommand(sql, true);
    if (output == null || output.isBlank()) {
      return null;
    }
    String[] lines = output.split("\n");
    return lines.length == 0 ? null : lines[0].trim();
  }

  private String runCommand(String sql, boolean captureOutput) {
    List<String> command = new ArrayList<>();
    command.add("psql");
    command.add("-h");
    command.add(config.dbHost());
    command.add("-p");
    command.add(Integer.toString(config.dbPort()));
    command.add("-U");
    command.add(config.dbUser());
    command.add("-d");
    command.add(config.dbName());
    command.add("-v");
    command.add("ON_ERROR_STOP=1");
    command.add("-X");
    command.add("-q");
    if (captureOutput) {
      command.add("-t");
      command.add("-A");
    }
    command.add("-c");
    command.add(sql);

    ProcessBuilder builder = new ProcessBuilder(command);
    Map<String, String> environment = builder.environment();
    environment.put("PGOPTIONS", "--client-min-messages=warning");
    String password = config.dbPassword();
    if (password != null) {
      environment.put("PGPASSWORD", password);
    }

    try {
      Process process = builder.start();
      byte[] stdout = process.getInputStream().readAllBytes();
      byte[] stderr = process.getErrorStream().readAllBytes();
      int exitCode = process.waitFor();
      String output = new String(stdout, StandardCharsets.UTF_8).trim();
      String error = new String(stderr, StandardCharsets.UTF_8).trim();
      if (exitCode != 0) {
        String message = !error.isBlank() ? error : output;
        throw new IllegalStateException("Database command failed: " + message);
      }
      if (!error.isBlank()) {
        System.err.println(error);
      }
      return captureOutput ? output : "";
    } catch (IOException ex) {
      throw new UncheckedIOException("Failed to execute psql command", ex);
    } catch (InterruptedException ex) {
      Thread.currentThread().interrupt();
      throw new IllegalStateException("Database command interrupted", ex);
    }
  }

  public static String quote(String value) {
    if (value == null) {
      return "NULL";
    }
    return "'" + value.replace("'", "''") + "'";
  }
}
