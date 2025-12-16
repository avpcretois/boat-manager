package com.github.avpcretois.boat_manager.domain;

import java.util.Optional;
import java.util.stream.Stream;

import com.github.avpcretois.boat_manager.domain.port.primary.BoatService;
import com.github.avpcretois.boat_manager.domain.port.secondary.BoatRepository;

public class BoatServiceImpl implements BoatService {

  private BoatRepository repository;

  public BoatServiceImpl(BoatRepository repository) {
    this.repository = repository;
  }

  @Override
  public Stream<Boat> streamAll() {
    return this.repository.streamAll();
  }

  @Override
  public Optional<Boat> findById(Long id) {
    return this.repository.findById(id);
  }

  @Override
  public Boat create(Boat model) {
    return this.repository.save(model);
  }

  @Override
  public Boat update(Boat model) {
    if (model.getId().isEmpty()) {
      throw new IllegalArgumentException("The boat to update has no id");
    }
    return this.repository.save(model);
  }

  @Override
  public boolean deleteById(Long id) {
    return this.repository.deleteById(id);
  }
}
