package com.github.avpcretois.boat_manager.containers;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

/**
 * Test configuration that provides a PostgreSQL container for development mode.
 * This container is automatically started and connected to Spring Boot's
 * DataSource.
 */
@TestConfiguration(proxyBeanMethods = false)
public class ContainersConfiguration {

    @Bean
    @ServiceConnection
    @SuppressWarnings("resource") // Spring manages the container lifecycle
    PostgreSQLContainer postgresContainer() {
        var dockerImageName = DockerImageName
                .parse("docker.io/postgres:18.1-alpine3.23")
                .asCompatibleSubstituteFor("postgres");
        return new PostgreSQLContainer(dockerImageName)
                .withDatabaseName("boatmanager")
                .withUsername("postgres")
                .withPassword("postgres");
    }
}
