package com.example.lawfirm.blog;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;
    private final TokenGuard tokenGuard;

    public BlogController(BlogService blogService, TokenGuard tokenGuard) {
        this.blogService = blogService;
        this.tokenGuard = tokenGuard;
    }

    @GetMapping
    public List<BlogPost> listBlogs() {
        return blogService.listBlogs();
    }

    @GetMapping("/slug/{slug}")
    public BlogPost getBlogBySlug(@PathVariable String slug) {
        return blogService.getBySlug(slug);
    }

    @GetMapping("/{id}")
    public BlogPost getBlogById(@PathVariable UUID id) {
        return blogService.getById(id);
    }

    @PostMapping
    public ResponseEntity<BlogPost> createBlog(@RequestHeader(value = "Authorization", required = false) String authorization,
                                               @Valid @RequestBody BlogRequest request) {
        tokenGuard.validate(authorization);
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(request.title());
        blogPost.setSlug(request.slug());
        blogPost.setSummary(request.summary());
        blogPost.setContent(request.content());
        blogPost.setAuthorName(request.authorName());
        return ResponseEntity.ok(blogService.createBlog(blogPost));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlog(@RequestHeader(value = "Authorization", required = false) String authorization,
                                               @PathVariable UUID id,
                                               @Valid @RequestBody BlogRequest request) {
        tokenGuard.validate(authorization);
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(request.title());
        blogPost.setSlug(request.slug());
        blogPost.setSummary(request.summary());
        blogPost.setContent(request.content());
        blogPost.setAuthorName(request.authorName());
        return ResponseEntity.ok(blogService.updateBlog(id, blogPost));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@RequestHeader(value = "Authorization", required = false) String authorization,
                                           @PathVariable UUID id) {
        tokenGuard.validate(authorization);
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }
}

record BlogRequest(
        @NotBlank String title,
        @NotBlank String slug,
        @NotBlank String summary,
        @NotBlank String content,
        @NotBlank String authorName
) {}
