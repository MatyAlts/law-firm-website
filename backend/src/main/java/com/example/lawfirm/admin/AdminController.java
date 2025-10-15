package com.example.lawfirm.admin;

import com.example.lawfirm.blog.TokenGuard;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;
    private final TokenGuard tokenGuard;

    public AdminController(AdminService adminService, TokenGuard tokenGuard) {
        this.adminService = adminService;
        this.tokenGuard = tokenGuard;
    }

    @GetMapping
    public ResponseEntity<List<AdminUser>> listAdmins(@RequestHeader(value = "Authorization", required = false) String authorization) {
        tokenGuard.validate(authorization);
        return ResponseEntity.ok(adminService.listAdmins());
    }

    @PostMapping
    public ResponseEntity<AdminUser> createAdmin(@RequestHeader(value = "Authorization", required = false) String authorization,
                                                 @Valid @RequestBody AdminRequest request) {
        tokenGuard.validate(authorization);
        try {
            AdminUser adminUser = adminService.createAdmin(request.email(), request.password(), request.role());
            return ResponseEntity.ok(adminUser);
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(409).build();
        }
    }
}

record AdminRequest(@Email String email, @NotBlank String password, @NotBlank String role) {}
