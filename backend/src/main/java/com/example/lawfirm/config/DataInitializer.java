package com.example.lawfirm.config;

import com.example.lawfirm.admin.AdminService;
import com.example.lawfirm.blog.BlogPost;
import com.example.lawfirm.blog.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner seedData(AdminService adminService, BlogService blogService) {
        return args -> {
            seedAdmin(adminService);
            seedSampleBlog(blogService);
        };
    }

    @Transactional
    void seedAdmin(AdminService adminService) {
        if (adminService.listAdmins().isEmpty()) {
            adminService.createAdmin("admin@lawfirm.com", "changeme", "superadmin");
            logger.info("Default admin user created with email admin@lawfirm.com and password changeme");
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
