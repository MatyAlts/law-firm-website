package com.example.lawfirm.admin;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class AdminService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<AdminUser> listAdmins() {
        return adminUserRepository.findAll();
    }

    public AdminUser findById(UUID id) {
        return adminUserRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Admin not found"));
    }

    public AdminUser findByEmail(String email) {
        return adminUserRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Admin not found"));
    }

    @Transactional
    public AdminUser createAdmin(String email, String password, String role) {
        AdminUser adminUser = new AdminUser();
        adminUser.setEmail(email);
        adminUser.setPasswordHash(passwordEncoder.encode(password));
        adminUser.setRole(role);
        return adminUserRepository.save(adminUser);
    }

    @Transactional
    public void updatePassword(UUID id, String password) {
        AdminUser adminUser = findById(id);
        adminUser.setPasswordHash(passwordEncoder.encode(password));
        adminUserRepository.save(adminUser);
    }
}
