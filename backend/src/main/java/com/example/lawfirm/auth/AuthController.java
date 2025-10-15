package com.example.lawfirm.auth;

import com.example.lawfirm.admin.AdminService;
import com.example.lawfirm.admin.AdminUser;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(AdminService adminService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        AdminUser adminUser;
        try {
            adminUser = adminService.findByEmail(request.email());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(401).build();
        }
        if (!passwordEncoder.matches(request.password(), adminUser.getPasswordHash())) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtService.generateToken(adminUser.getId().toString(), Map.of(
                "email", adminUser.getEmail(),
                "role", adminUser.getRole()
        ));

        return ResponseEntity.ok(new LoginResponse(token, adminUser.getEmail(), adminUser.getRole()));
    }

    @GetMapping("/me")
    public ResponseEntity<LoginResponse> currentAdmin(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authorizationHeader.substring(7);
        Claims claims;
        try {
            claims = jwtService.parseToken(token);
        } catch (Exception ex) {
            return ResponseEntity.status(401).build();
        }
        String email = claims.get("email", String.class);
        String role = claims.get("role", String.class);

        return ResponseEntity.ok(new LoginResponse(token, email, role));
    }
}
