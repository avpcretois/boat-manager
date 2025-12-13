package com.github.avpcretois.boat_manager.web.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

  @GetMapping("/login")
  public ResponseEntity<Void> check() {
    // If the user does authenticate spring security will respond with HTTP 401
    return ResponseEntity.noContent().build();
  }
}
