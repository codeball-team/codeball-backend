package com.codeball.repositories;

import com.codeball.model.Game;
import com.codeball.repositories.types.PagingAndSortingRepositoryWithOptionals;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends PagingAndSortingRepositoryWithOptionals<Game, Long> {

    Optional<Game> findTop1ByGameOverOrderByStartTimeDesc(boolean gameOver);

    Optional<Game> findTop1ByGameOverOrderByStartTimeAsc(boolean gameOver);

    default Optional<Game> findLastGame() {
        return this.findTop1ByGameOverOrderByStartTimeDesc(true);
    }

    default Optional<Game> findUpcomingGame() {
        return this.findTop1ByGameOverOrderByStartTimeAsc(false);
    }

    Iterable<Game> findAllByOrderByStartTimeDesc();
    
}
