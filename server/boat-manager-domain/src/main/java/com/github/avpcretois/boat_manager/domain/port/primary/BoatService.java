package com.github.avpcretois.boat_manager.domain.port.primary;

import java.util.Collection;

import com.github.avpcretois.boat_manager.domain.Boat;

/**
 * Primary port for boat management operations.
 *
 * <p>
 * This interface defines the use cases available for managing boats.
 * It is implemented by the domain service and called by primary adapters
 * (e.g., REST controllers).
 */
public interface BoatService {

  Collection<Boat> findAll();

  // TODO: Add boat management use cases
  // Example methods:
  // Boat createBoat(CreateBoatCommand command);
  // Optional<Boat> findBoatById(BoatId id);
  // List<Boat> findAllBoats();
  // void deleteBoat(BoatId id);
}
