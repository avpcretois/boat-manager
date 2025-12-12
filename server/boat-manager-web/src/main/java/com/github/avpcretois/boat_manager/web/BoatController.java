package com.github.avpcretois.boat_manager.web;

import java.util.Collection;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/boats")
public class BoatController {

  @GetMapping
  public Collection<BoatDTO> getAllBoats() {
    return List.of(new BoatDTO("VD-19283", "Le Magnifique", 5.05f, 1.1f, 0.8f,1.2f));
  }

  @GetMapping("/{identifier}")
  public BoatDTO getBoatById(@PathVariable String identifier) {
    return null;
  }

  @PostMapping
  public BoatDTO createBoat(@RequestBody BoatDTO boatDTO,
      @RequestParam(name = "genId", required = false, defaultValue = "false") boolean generateIdentifier) {
    return null;
  }

  @PutMapping("/{identifier}")
  public BoatDTO createOrUpdateBoat(@PathVariable String identifier, @RequestBody BoatDTO boatDTO) {
    return null;
  }

  @PatchMapping("/{identifier}")
  public BoatDTO updateBoat(@PathVariable String identifier, @RequestBody BoatDTO boatDTO) {
    return null;
  }

  @DeleteMapping("/{identifier}")
  public void deleteBoat(@PathVariable String identifier) {
  }
}
