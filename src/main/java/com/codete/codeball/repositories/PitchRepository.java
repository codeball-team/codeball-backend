package com.codete.codeball.repositories;

import com.codete.codeball.model.Pitch;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository extends CrudRepository<Pitch, Long> {

}
