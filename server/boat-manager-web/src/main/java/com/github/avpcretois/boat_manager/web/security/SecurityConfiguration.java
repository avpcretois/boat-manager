package com.github.avpcretois.boat_manager.web.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    // This SecurityFilterChain configuration disable the login page and make Spring
    // Boot return a Json response instead
    return http
        .sessionManagement(hssmc -> hssmc.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults())
        .exceptionHandling(eh -> eh.authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
        .build();
  }

  @Bean
  public InMemoryUserDetailsManager userDetailsService(@Value("${security.user.name}") String name, @Value("${security.user.password}") String password) {
    UserDetails user = User.withUsername(name)
        .password("{noop}" + password)
        .build();
    return new InMemoryUserDetailsManager(user);
  }
}
