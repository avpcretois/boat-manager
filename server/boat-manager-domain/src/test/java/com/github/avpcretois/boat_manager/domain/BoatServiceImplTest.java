package com.github.avpcretois.boat_manager.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.github.avpcretois.boat_manager.domain.port.primary.BoatService;
import com.github.avpcretois.boat_manager.domain.port.secondary.BoatRepository;

class BoatServiceImplTest {

  private BoatRepository repositoryMock;
  private BoatService boatService;

  @BeforeEach
  void init() {
    this.repositoryMock = Mockito.mock(BoatRepository.class);
    this.boatService = new BoatServiceImpl(this.repositoryMock);
  }

  @Test
  @DisplayName("it should throw exception when updating a model without id")
  void updateModelWithoutId() {
    var model = new Boat("Test boat");

    ThrowingCallable when = () -> this.boatService.update(model);

    assertThatThrownBy(when)
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessage("The boat to update has no id");
    verify(this.repositoryMock, times(0)).save(model);
  }
}
