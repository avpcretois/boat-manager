package com.github.avpcretois.boat_manager.web;

public record BoatDTO(String identifier,
    String name,
    String type,
    Float lengthOverall,
    Float beam,
    Float draft,
    Float airDraft) {
}
