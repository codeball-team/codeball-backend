package com.codete.codeball.repositories;

import com.codete.codeball.model.Game;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends PagingAndSortingRepository<Game, Long> {

}
