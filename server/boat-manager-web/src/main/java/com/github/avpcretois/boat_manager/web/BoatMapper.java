package com.github.avpcretois.boat_manager.web;

import java.util.function.Consumer;

import com.github.avpcretois.boat_manager.domain.Boat;

public class BoatMapper {

  public BoatDTO toDto(Boat model) {
    return new BoatDTO(
        model.getId().orElse(null),
        model.getName(),
        model.getDescription(),
        model.getRegistrationNumber().orElse(null),
        model.getLengthOverall().orElse(null),
        model.getBeam().orElse(null),
        model.getDraft().orElse(null),
        model.getAirDraft().orElse(null));
  }

  public Boat toModel(BoatDTO boatDTO) {
    Boat boat = new Boat(boatDTO.name());
    setIfNotNull(boatDTO.description(), boat::setDescription);
    setIfNotNull(boatDTO.registrationNumber(), boat::setRegistrationNumber);
    setIfNotNull(boatDTO.lengthOverall(), boat::setLengthOverall);
    setIfNotNull(boatDTO.beam(), boat::setBeam);
    setIfNotNull(boatDTO.draft(), boat::setDraft);
    setIfNotNull(boatDTO.airDraft(), boat::setAirDraft);
    return boat;
  }

  private <T> void setIfNotNull(T value, Consumer<T> setter) {
    if (value != null) {
      setter.accept(value);
    }
  }
}
