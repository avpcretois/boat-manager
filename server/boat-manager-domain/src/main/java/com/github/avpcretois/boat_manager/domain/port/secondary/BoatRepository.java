package com.github.avpcretois.boat_manager.domain.port.secondary;

import java.util.Optional;
import java.util.stream.Stream;

import com.github.avpcretois.boat_manager.domain.Boat;

/// Secondary port for {@link Boat}s persistence operations.
///
/// This interface defines the persistences operations required for
/// managing boats.
public interface BoatRepository {
  Stream<Boat> streamAll();

  Optional<Boat> findById(Long id);

  Boat save(Boat model);

  boolean deleteById(Long id);
}
