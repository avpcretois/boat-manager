package com.github.avpcretois.boat_manager.web;

public record BoatDTO(
    Long id,
    String name,
    String description,
    String registrationNumber,
    Float lengthOverall,
    Float beam,
    Float draft,
    Float airDraft) {
}
