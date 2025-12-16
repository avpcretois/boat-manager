package com.github.avpcretois.boat_manager.data;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

import org.springframework.stereotype.Component;

import com.github.avpcretois.boat_manager.domain.Boat;
import com.github.avpcretois.boat_manager.domain.port.secondary.BoatRepository;

@Component
public class InMemoryBoatRepository implements BoatRepository {

  private Map<Long, Boat> storage = new ConcurrentHashMap<>();
  private AtomicLong idSequence = new AtomicLong(1);

  @Override
  public Stream<Boat> streamAll() {
    return this.storage.values().stream();
  }

  @Override
  public Optional<Boat> findById(Long id) {
    return Optional.ofNullable(this.storage.get(id));
  }

  @Override
  public Boat save(Boat model) {
    Long id;
    if (model.getId().isEmpty()) {
      id = getNewId();
      model = model.withId(id);
    } else {
      id = model.getId().get();
    }
    this.storage.put(id, model);
    return model;
  }

  @Override
  public boolean deleteById(Long id) {
    return this.storage.remove(id) != null;
  }

  private synchronized long getNewId() {
    long id = this.idSequence.getAndIncrement();
    if (this.storage.containsKey(id)) {
      this.idSequence.set(this.storage.entrySet().stream()
          .mapToLong(entry -> entry.getKey())
          .max().getAsLong());
      return this.idSequence.incrementAndGet();
    } else {
      return id;
    }
  }
}
