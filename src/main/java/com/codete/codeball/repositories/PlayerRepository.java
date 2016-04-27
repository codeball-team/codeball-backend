package com.codete.codeball.repositories;

import com.codete.codeball.model.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {
}
