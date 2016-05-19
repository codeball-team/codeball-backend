package com.codete.codeball.repositories;

import com.codete.codeball.model.Game;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends PagingAndSortingRepository<Game, Long> {

    Game findTop1ByGameOverOrderByStartTimestampDesc(boolean gameOver);

    Game findTop1ByGameOverOrderByStartTimestampAsc(boolean gameOver);

    default Game findLastGame() {
        return this.findTop1ByGameOverOrderByStartTimestampDesc(true);
    }

    default Game findUpcomingGame() {
        return this.findTop1ByGameOverOrderByStartTimestampAsc(false);
    }

}
