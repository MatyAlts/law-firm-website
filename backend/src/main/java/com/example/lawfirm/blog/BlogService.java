package com.example.lawfirm.blog;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class BlogService {

    private final BlogPostRepository blogPostRepository;

    public BlogService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPost> listBlogs() {
        return blogPostRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .toList();
    }

    public BlogPost getBySlug(String slug) {
        return blogPostRepository.findBySlug(slug).orElseThrow(() -> new IllegalArgumentException("Blog not found"));
    }

    public BlogPost getById(UUID id) {
        return blogPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Blog not found"));
    }

    @Transactional
    public BlogPost createBlog(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }

    @Transactional
    public BlogPost updateBlog(UUID id, BlogPost updated) {
        BlogPost existing = getById(id);
        existing.setTitle(updated.getTitle());
        existing.setSlug(updated.getSlug());
        existing.setSummary(updated.getSummary());
        existing.setContent(updated.getContent());
        existing.setAuthorName(updated.getAuthorName());
        return blogPostRepository.save(existing);
    }

    @Transactional
    public void deleteBlog(UUID id) {
        blogPostRepository.deleteById(id);
    }
}
