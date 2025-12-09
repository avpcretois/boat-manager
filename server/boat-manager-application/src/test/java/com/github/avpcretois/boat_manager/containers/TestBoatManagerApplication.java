package com.github.avpcretois.boat_manager.containers;

import org.springframework.boot.SpringApplication;

import com.github.avpcretois.boat_manager.BoatManagerApplication;

/**
 * Development entry point that starts the application with PostgreSQL running
 * in a Docker container.
 *
 * Run this class instead of BoatManagerApplication to automatically start a
 * PostgreSQL
 * container via Testcontainers. The container will be automatically stopped
 * when the app shuts down.
 *
 * Usage: Run this class with `mvn spring-boot:test-run` or directly from your
 * IDE.
 */
public class TestBoatManagerApplication {

    public static void main(String[] args) {
        SpringApplication.from(BoatManagerApplication::main)
                .with(ContainersConfiguration.class)
                .run(args);
    }
}
