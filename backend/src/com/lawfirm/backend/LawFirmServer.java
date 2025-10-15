package com.lawfirm.backend;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public final class LawFirmServer {
  private LawFirmServer() {}

  public static void main(String[] args) throws IOException {
    Config config = Config.fromEnv();
    Database database = new Database(config);
    database.initialize();

    AdminService adminService = new AdminService(database, config);
    adminService.ensureDefaultAdmin();
    BlogService blogService = new BlogService(database);
    JwtService jwtService = new JwtService(config.jwtSecret(), config.jwtExpirationMinutes());

    HttpServer server = HttpServer.create(new InetSocketAddress(config.serverPort()), 0);
    ExecutorService executor = Executors.newCachedThreadPool();
    server.setExecutor(executor);
    server.createContext("/api", new ApiHandler(adminService, blogService, jwtService));
    server.start();
    System.out.println("Servidor backend iniciado en http://localhost:" + config.serverPort() + "/api");
  }

  private static final class ApiHandler implements HttpHandler {
    private final AdminService adminService;
    private final BlogService blogService;
    private final JwtService jwtService;

    private ApiHandler(AdminService adminService, BlogService blogService, JwtService jwtService) {
      this.adminService = adminService;
      this.blogService = blogService;
      this.jwtService = jwtService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
      try {
        String method = exchange.getRequestMethod();
        if ("OPTIONS".equalsIgnoreCase(method)) {
          HttpUtil.addCorsHeaders(exchange.getResponseHeaders());
          HttpUtil.writeEmpty(exchange, 204);
          return;
        }

        String path = exchange.getRequestURI().getPath();
        List<String> segments = extractSegments(path);
        if (segments.isEmpty()) {
          throw new HttpException(404, "Ruta no encontrada");
        }

        String resource = segments.get(0);
        switch (resource) {
          case "auth" -> handleAuth(exchange, method, segments);
          case "blogs" -> handleBlogs(exchange, method, segments);
          case "admins" -> handleAdmins(exchange, method, segments);
          default -> throw new HttpException(404, "Ruta no encontrada");
        }
      } catch (HttpException ex) {
        HttpUtil.writeError(exchange, ex.statusCode(), ex.getMessage());
      } catch (Exception ex) {
        ex.printStackTrace();
        HttpUtil.writeError(exchange, 500, "Error interno del servidor");
      } finally {
        exchange.close();
      }
    }

    private void handleAuth(HttpExchange exchange, String method, List<String> segments) throws IOException {
      if (segments.size() < 2) {
        throw new HttpException(404, "Ruta no encontrada");
      }
      String action = segments.get(1);
      if ("login".equals(action) && "POST".equalsIgnoreCase(method)) {
        String body = HttpUtil.readBody(exchange);
        Map<String, Object> json = JsonParser.parseObject(body);
        String email = stringField(json.get("email"));
        String password = stringField(json.get("password"));
        if (email == null || password == null) {
          throw new HttpException(400, "Email y contraseña son obligatorios");
        }
        AdminService.AdminUser user = adminService.authenticate(email, password);
        if (user == null) {
          throw new HttpException(401, "Credenciales inválidas");
        }
        String token = jwtService.issueToken(user);
        HttpUtil.writeJson(exchange, 200, Map.of(
            "token", token,
            "email", user.email(),
            "role", user.role()));
        return;
      }

      if ("me".equals(action) && "GET".equalsIgnoreCase(method)) {
        JwtService.AuthSession session = requireAuth(exchange);
        HttpUtil.writeJson(exchange, 200, Map.of(
            "token", HttpUtil.getAuthorizationToken(exchange),
            "email", session.email(),
            "role", session.role()));
        return;
      }

      throw new HttpException(404, "Ruta no encontrada");
    }

    private void handleBlogs(HttpExchange exchange, String method, List<String> segments) throws IOException {
      if (segments.size() == 1) {
        if ("GET".equalsIgnoreCase(method)) {
          String json = blogService.listPublicBlogs();
          HttpUtil.writeJson(exchange, 200, json);
          return;
        }
        requireAuth(exchange);
        if ("POST".equalsIgnoreCase(method)) {
          String body = HttpUtil.readBody(exchange);
          Map<String, Object> payload = JsonParser.parseObject(body);
          String json = blogService.createBlog(payload);
          HttpUtil.writeJson(exchange, 201, json);
          return;
        }
        throw new HttpException(405, "Método no permitido");
      }

      if (segments.size() >= 2 && "slug".equals(segments.get(1))) {
        if (segments.size() != 3 || !"GET".equalsIgnoreCase(method)) {
          throw new HttpException(404, "Ruta no encontrada");
        }
        String slug = segments.get(2);
        String blog = blogService.getBlogBySlug(slug);
        if (blog == null) {
          throw new HttpException(404, "Blog no encontrado");
        }
        HttpUtil.writeJson(exchange, 200, blog);
        return;
      }

      String blogId = segments.get(1);
      if ("GET".equalsIgnoreCase(method)) {
        requireAuth(exchange);
        String blog = blogService.getBlogById(blogId);
        if (blog == null) {
          throw new HttpException(404, "Blog no encontrado");
        }
        HttpUtil.writeJson(exchange, 200, blog);
        return;
      }

      requireAuth(exchange);
      if ("PUT".equalsIgnoreCase(method)) {
        String body = HttpUtil.readBody(exchange);
        Map<String, Object> payload = JsonParser.parseObject(body);
        String blog = blogService.updateBlog(blogId, payload);
        HttpUtil.writeJson(exchange, 200, blog);
        return;
      }
      if ("DELETE".equalsIgnoreCase(method)) {
        blogService.deleteBlog(blogId);
        HttpUtil.writeJson(exchange, 200, Map.of("success", Boolean.TRUE));
        return;
      }
      throw new HttpException(405, "Método no permitido");
    }

    private void handleAdmins(HttpExchange exchange, String method, List<String> segments) throws IOException {
      requireAuth(exchange);
      if ("GET".equalsIgnoreCase(method)) {
        String json = adminService.listAdminsJson();
        HttpUtil.writeJson(exchange, 200, json);
        return;
      }
      if ("POST".equalsIgnoreCase(method)) {
        String body = HttpUtil.readBody(exchange);
        Map<String, Object> payload = JsonParser.parseObject(body);
        String email = stringField(payload.get("email"));
        String password = stringField(payload.get("password"));
        String role = stringField(payload.getOrDefault("role", "editor"));
        String json = adminService.createAdminJson(email, password, role);
        HttpUtil.writeJson(exchange, 201, json);
        return;
      }
      throw new HttpException(405, "Método no permitido");
    }

    private JwtService.AuthSession requireAuth(HttpExchange exchange) {
      String token = HttpUtil.getAuthorizationToken(exchange);
      if (token == null || token.isBlank()) {
        throw new HttpException(401, "No autorizado");
      }
      return jwtService.verify(token).orElseThrow(() -> new HttpException(401, "No autorizado"));
    }

    private List<String> extractSegments(String path) {
      String relative = path.startsWith("/api") ? path.substring(4) : path;
      String[] parts = relative.split("/");
      List<String> segments = new ArrayList<>();
      for (String part : parts) {
        if (!part.isBlank()) {
          segments.add(part);
        }
      }
      return segments;
    }

    private String stringField(Object value) {
      if (value == null) {
        return null;
      }
      String str = String.valueOf(value);
      return str == null ? null : str.trim();
    }
  }
}
