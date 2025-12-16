package com.github.avpcretois.boat_manager.web;

import java.util.stream.Stream;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.avpcretois.boat_manager.domain.Boat;
import com.github.avpcretois.boat_manager.domain.port.primary.BoatService;

@RestController
@RequestMapping("/boats")
public class BoatController {

  private BoatService boatService;
  private BoatMapper mapper;

  public BoatController(BoatService service) {
    this.boatService = service;
  }

  @GetMapping
  public Stream<BoatDTO> getAllBoats() {
    return this.boatService.getAll()
        .stream()
        .map(this.mapper::toDto);
  }

  @GetMapping("/{id}")
  public ResponseEntity<BoatDTO> getBoatById(@PathVariable Long id) {
    return this.boatService.findById(id)
        .map(this.mapper::toDto)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public BoatDTO createBoat(@RequestBody BoatDTO boatDTO) {
    if (boatDTO.id() != null) {
      throw new IllegalArgumentException("The boat id should not be set");
    }
    Boat newBoat = this.boatService.create(this.mapper.toModel(boatDTO));
    return this.mapper.toDto(newBoat);
  }

  @PatchMapping("/{id}")
  public BoatDTO updateBoat(@PathVariable Long id, @RequestBody BoatDTO boatDTO) {
    return boatDTO;
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBoat(@PathVariable Long id) {
    this.boatService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
