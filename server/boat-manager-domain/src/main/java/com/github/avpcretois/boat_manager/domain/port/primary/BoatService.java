package com.github.avpcretois.boat_manager.domain.port.primary;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

import com.github.avpcretois.boat_manager.domain.Boat;

/// Primary port for boat management operations.
///
/// This interface defines the use cases available for managing boats.
///
/// @implNote The implementations of this service must not be used in any adapter
public interface BoatService {

  Stream<Boat> streamAll();

  default Collection<Boat> findAll() {
    return this.streamAll().toList();
  }

  Collection<Boat> getAll();

  Optional<Boat> findById(Long id);

  Boat create(Boat model);

  void deleteById(Long id);
}
