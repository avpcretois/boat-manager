package com.github.avpcretois.boat_manager.domain;

public record Boat(Long id, String name, String description) {
  public Boat {
    if (id == null) {
      throw new IllegalArgumentException("id must not be null");
    }
    if (name == null) {
      throw new IllegalArgumentException("name must not be null");
    }
    if (description == null) {
      throw new IllegalArgumentException("description must not be null");
    }
  }
}
