package com.example.lawfirm.auth;

import com.example.lawfirm.admin.AdminService;
import com.example.lawfirm.admin.AdminUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reset-password")
public class ResetPasswordController {

    private final AdminService adminService;

    public ResetPasswordController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String newPassword = request.get("password");
            
            if (email == null || newPassword == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
            }

            // Buscar el usuario
            AdminUser user = adminService.findByEmail(email);
            
            // Actualizar la contraseña
            adminService.updatePassword(user.getId(), newPassword);
            
            return ResponseEntity.ok(Map.of(
                "success", true, 
                "message", "Password updated successfully for " + email
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(Map.of("status", "Reset password endpoint is working"));
    }
}
