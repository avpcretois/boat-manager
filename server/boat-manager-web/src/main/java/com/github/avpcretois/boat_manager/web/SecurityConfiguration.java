package com.github.avpcretois.boat_manager.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

@Configuration
public class SecurityConfiguration {
  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web
        .ignoring()
        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html");
  }
}
