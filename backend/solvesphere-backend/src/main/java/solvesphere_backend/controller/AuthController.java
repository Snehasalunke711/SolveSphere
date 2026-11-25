
package solvesphere_backend.controller;

import solvesphere_backend.dto.RegisterRequest;
import solvesphere_backend.dto.RegisterResponse;
import solvesphere_backend.dto.LoginRequest;
import solvesphere_backend.dto.LoginResponse;
import solvesphere_backend.dto.CurrentUserResponse;
import solvesphere_backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = userService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = userService.loginUser(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser(
            Authentication authentication) {

        CurrentUserResponse response =
            userService.getCurrentUser(authentication.getName());

        return ResponseEntity.ok(response);
    }
}
