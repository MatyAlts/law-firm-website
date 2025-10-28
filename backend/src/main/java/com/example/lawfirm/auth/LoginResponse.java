package com.example.lawfirm.auth;

public record LoginResponse(String token, String email, String role) {
}
