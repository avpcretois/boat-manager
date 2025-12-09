package com.github.avpcretois.boat_manager;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import com.github.avpcretois.boat_manager.containers.ContainersConfiguration;

@SpringBootTest
@Import(ContainersConfiguration.class)
class BoatManagerApplicationTests {

  @Test
  void contextLoads() {
  }

}
