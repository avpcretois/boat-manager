package com.github.avpcretois.boat_manager.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.github.avpcretois.boat_manager.domain.port.primary.BoatService;
import com.github.avpcretois.boat_manager.domain.port.secondary.BoatRepository;

@Component
public class BoatDomainFactory {

  @Bean
  public BoatService boatService(BoatRepository repository) {
    return new BoatServiceImpl(repository);
  }
}
