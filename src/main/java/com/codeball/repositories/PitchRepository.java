package com.codeball.repositories;

import com.codeball.model.Pitch;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository extends CrudRepository<Pitch, Long> {

}
