package com.codeball.repositories;

import com.codeball.model.Game;
import com.codeball.repositories.types.PagingAndSortingRepositoryWithOptionals;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends PagingAndSortingRepositoryWithOptionals<Game, Long> {

    Optional<Game> findTop1ByGameOverOrderByStartTimestampDesc(boolean gameOver);

    Optional<Game> findTop1ByGameOverOrderByStartTimestampAsc(boolean gameOver);

    default Optional<Game> findLastGame() {
        return this.findTop1ByGameOverOrderByStartTimestampDesc(true);
    }

    default Optional<Game> findUpcomingGame() {
        return this.findTop1ByGameOverOrderByStartTimestampAsc(false);
    }

    Iterable<Game> findAllByOrderByStartTimestampDesc();
    
}
