package com.codete.codeball.repositories;

import com.codete.codeball.model.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {

}
