package com.codeball.repositories;

import com.codeball.exceptions.GameNotFoundException;
import com.codeball.model.Game;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends PagingAndSortingRepository<Game, Long> {

    Optional<Game> findTop1ByGameOverOrderByStartTimeDesc(boolean gameOver);

    Optional<Game> findTop1ByGameOverOrderByStartTimeAsc(boolean gameOver);

    default Optional<Game> findLastGame() {
        return this.findTop1ByGameOverOrderByStartTimeDesc(true);
    }

    default Optional<Game> findUpcomingGame() {
        return this.findTop1ByGameOverOrderByStartTimeAsc(false);
    }

    Iterable<Game> findAllByOrderByStartTimeDesc();

    default Game getById(long id) {
        return findById(id).orElseThrow(() -> new GameNotFoundException(id));
    }
}
