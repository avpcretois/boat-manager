package com.github.avpcretois.boat_manager.data;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;

import java.util.Optional;
import java.util.stream.Stream;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.github.avpcretois.boat_manager.domain.Boat;

public class InMemoryBoatRepositoryTest {

  private InMemoryBoatRepository inMemoryBoatRepository;

  @BeforeEach
  void init() {
    this.inMemoryBoatRepository = new InMemoryBoatRepository();
  }

  @Test
  @DisplayName("it should delete a boat stored by its id")
  void deleteStoredId() {
    long id = 1;
    this.inMemoryBoatRepository.save(new Boat(id, "Geobukseon"));

    boolean result = this.inMemoryBoatRepository.deleteById(id);

    assertThat(result).isTrue();
    assertThat(this.inMemoryBoatRepository.findById(id)).isEmpty();
  }

  @Test
  @DisplayName("it should not fail to delete a non existent id")
  void deleteNonExistentId() {
    long id = 1;

    boolean result = this.inMemoryBoatRepository.deleteById(id);

    assertThat(result).isFalse();
  }

  @Test
  @DisplayName("it should throw NPE when deleting null id")
  void deleteNullId() {
    Long id = null;

    ThrowingCallable when = () -> this.inMemoryBoatRepository.deleteById(id);

    assertThatThrownBy(when).isInstanceOf(NullPointerException.class);
  }

  @Test
  @DisplayName("it should not fail to stream empty storage")
  void streamEmpty() {
    // Given nothing

    Stream<Boat> boatStream = this.inMemoryBoatRepository.streamAll();

    assertThat(boatStream).isEmpty();
  }

  @Test
  @DisplayName("it should stream boats with their id set")
  void steamSaved() {
    this.inMemoryBoatRepository.save(new Boat("Queen Mary"));

    Stream<Boat> boatStream = this.inMemoryBoatRepository.streamAll();

    assertThat(boatStream).contains(new Boat(1L, "Queen Mary"));
  }

  @Test
  @DisplayName("it should find stored boat by its id")
  void findById() {
    long id = 1;
    var boat = new Boat(id, "Le Terrible");
    this.inMemoryBoatRepository.save(boat);

    Optional<Boat> found = this.inMemoryBoatRepository.findById(id);

    assertThat(found).contains(boat);
  }

  @Test
  @DisplayName("it should not find a non existent id")
  void findByIdMissing() {
    long id = 1;
    var boat = new Boat(id, "Le Terrible");
    this.inMemoryBoatRepository.save(boat);

    Optional<Boat> found = this.inMemoryBoatRepository.findById(id + 42);

    assertThat(found).isEmpty();
  }

  @Test
  @DisplayName("it should throw if trying to find null id")
  void findByNull() {
    // Given nothing

    ThrowingCallable when = () -> this.inMemoryBoatRepository.findById(null);

    assertThatThrownBy(when).isInstanceOf(NullPointerException.class);
  }

  @Test
  @DisplayName("it should throw when saving null boat")
  void saveNull() {
    Boat boat = null;

    ThrowingCallable when = () -> this.inMemoryBoatRepository.save(boat);

    assertThatThrownBy(when).isInstanceOf(NullPointerException.class);
  }

  @Test
  @DisplayName("it should save boat with a generated id")
  void saveBoatWithoutId() {
    var boat = new Boat("Titanic");

    Boat savedBoat = this.inMemoryBoatRepository.save(boat);

    assertThat(savedBoat)
        .extracting(b -> b.getId().get(), Boat::getName)
        .contains(1L, "Titanic");
  }

  @Test
  @DisplayName("it should reset the id sequence when saving if required")
  void resetSequenceValueIfRequired() {
    var boat1 = new Boat("Hermione");
    var boat2 = new Boat(2L, "Mayflower");
    var boat3 = new Boat("Mary Rose");

    this.inMemoryBoatRepository.save(boat1);
    this.inMemoryBoatRepository.save(boat2);
    this.inMemoryBoatRepository.save(boat3);

    assertThat(this.inMemoryBoatRepository.streamAll())
        .extracting(b -> b.getId().get(), Boat::getName)
        .containsExactly(tuple(1L, "Hermione"),
            tuple(2L, "Mayflower"),
            tuple(3L, "Mary Rose"));
  }
}
