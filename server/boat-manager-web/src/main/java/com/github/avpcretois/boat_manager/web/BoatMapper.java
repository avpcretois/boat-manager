package com.github.avpcretois.boat_manager.web;

import org.springframework.stereotype.Component;

import com.github.avpcretois.boat_manager.domain.Boat;

@Component
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
    boat.setDescription(boatDTO.description());
    boat.setRegistrationNumber(boatDTO.registrationNumber());
    boat.setLengthOverall(boatDTO.lengthOverall());
    boat.setBeam(boatDTO.beam());
    boat.setDraft(boatDTO.draft());
    boat.setAirDraft(boatDTO.airDraft());
    return boat;
  }
}
