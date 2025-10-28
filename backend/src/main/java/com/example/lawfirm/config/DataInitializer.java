package com.example.lawfirm.config;

import com.example.lawfirm.admin.AdminService;
import com.example.lawfirm.admin.AdminUser;
import com.example.lawfirm.blog.BlogPost;
import com.example.lawfirm.blog.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Value("${INITIAL_ADMIN_EMAIL:}")
    private String initialAdminEmail;

    @Value("${INITIAL_ADMIN_PASSWORD:}")
    private String initialAdminPassword;

    @Value("${INITIAL_ADMIN_ROLE:superadmin}")
    private String initialAdminRole;

    @Bean
    CommandLineRunner seedData(AdminService adminService, BlogService blogService) {
        return args -> {
            seedAdmin(adminService);
            seedSampleBlog(blogService);
        };
    }

    @Transactional
    void seedAdmin(AdminService adminService) {
        // Only create initial admin if environment variables are set
        if (initialAdminEmail == null || initialAdminEmail.isEmpty() || 
            initialAdminPassword == null || initialAdminPassword.isEmpty()) {
            logger.warn("No initial admin credentials provided in environment variables. Skipping admin creation.");
            return;
        }
        
        String email = initialAdminEmail;
        String password = initialAdminPassword;
        String role = initialAdminRole;
        
        try {
            // Buscar si el admin ya existe
            AdminUser existingAdmin = adminService.findByEmail(email);
            // Si existe, actualizar la contraseña
            adminService.updatePassword(existingAdmin.getId(), password);
            logger.info("Updated password for existing admin user: {}", email);
        } catch (IllegalArgumentException e) {
            // Si no existe, crearlo
            adminService.createAdmin(email, password, role);
            logger.info("Initial admin user created with email: {}", email);
        }
    }

    @Transactional
    void seedSampleBlog(BlogService blogService) {
        if (blogService.listBlogs().isEmpty()) {
            BlogPost post = new BlogPost();
            post.setTitle("Bienvenido a nuestro blog");
            post.setSlug("bienvenido");
            post.setSummary("Primer artículo del blog de la firma");
            post.setContent("Este es un post de ejemplo para el nuevo backend en Java.");
            post.setAuthorName("Equipo Legal");
            blogService.createBlog(post);
            logger.info("Sample blog post created");
        }
    }
}
