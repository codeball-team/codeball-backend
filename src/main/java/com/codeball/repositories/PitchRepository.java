package com.codeball.repositories;

import com.codeball.model.Pitch;
import com.codeball.repositories.types.CrudRepositoryWithOptionals;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository extends CrudRepositoryWithOptionals<Pitch, Long> {

}
