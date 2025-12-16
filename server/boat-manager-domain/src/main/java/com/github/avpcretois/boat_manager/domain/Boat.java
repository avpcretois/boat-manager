package com.github.avpcretois.boat_manager.domain;

import java.util.Objects;
import java.util.Optional;

public class Boat {
  private Long id;
  private String name;
  private String description;
  private String registrationNumber;
  private Float lengthOverall;
  private Float beam;
  private Float draft;
  private Float airDraft;

  public Boat(Long id,
      String name) {
    this.id = Objects.requireNonNull(id, "id cannot be null");
    setName(name);
  }

  public Boat(String name) {
    setName(name);
  }

  public Boat withId(Long id) {
    var other = new Boat(Objects.requireNonNull(id, "id cannot be null"), this.name);
    other.description = this.description;
    other.registrationNumber = this.registrationNumber;
    other.lengthOverall = this.lengthOverall;
    other.beam = this.beam;
    other.draft = this.draft;
    other.airDraft = this.airDraft;
    return other;
  }

  public void setName(String name) {
    if (name == null || !name.matches("^[A-z]+( [A-z]+)*$")) {
      throw new IllegalArgumentException("The name must only containt latin letters, not start of "
          + "finish by a space and cannot contain multiple consecutives spaces");
    }
    this.name = name;
  }

  public void setDescription(String description) {
    if (description != null && description.isBlank()) {
      throw new IllegalArgumentException("The description cannot be blank");
    }
    this.description = description;
  }

  public void setRegistrationNumber(String registrationNumber) {
    if (registrationNumber == null || registrationNumber != null && !registrationNumber.matches("^[0-9]{8}$")) {
      throw new IllegalArgumentException("The registration number must only contain 8 digits");
    }
    this.registrationNumber = registrationNumber;
  }

  public void setLengthOverall(Float lengthOverall) {
    this.lengthOverall = requirePositive(lengthOverall, "lengthOverall");
  }

  public void setBeam(Float beam) {
    this.beam = requirePositive(beam, "beam");
  }

  public void setDraft(Float draft) {
    this.draft = requirePositive(draft, "draft");
  }

  public void setAirDraft(Float airDraft) {
    this.airDraft = requirePositive(airDraft, "air draft");
  }

  public Optional<Long> getId() {
    return Optional.ofNullable(id);
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public Optional<String> getRegistrationNumber() {
    return Optional.ofNullable(registrationNumber);
  }

  public Optional<Float> getLengthOverall() {
    return Optional.ofNullable(lengthOverall);
  }

  public Optional<Float> getBeam() {
    return Optional.ofNullable(beam);
  }

  public Optional<Float> getDraft() {
    return Optional.ofNullable(draft);
  }

  public Optional<Float> getAirDraft() {
    return Optional.ofNullable(airDraft);
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    return this == obj || obj instanceof Boat other && this.id == other.id;
  }

  private Float requirePositive(Float value, String label) {
    if (value == null || value < 0) {
      throw new IllegalArgumentException("The " + label + " cannot be null or non positive value");
    }
    return value;
  }
}
