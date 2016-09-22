import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export const gamesSelector = createSelector(
  state => state.gamesData.games,
  games => games
);

export const previousGamesSelector = createSelector(
  gamesSelector,
  games => games.filter(({ isGameOver }) => isGameOver)
);

export const sortedGamesSelector = createSelector(
  state => state.gamesData.games,
  games => sortByMany(games, ['date']).reverse()
);

export const upcomingGamesSelector = createSelector(
  gamesSelector,
  games => games.filter(({ isGameOver }) => !isGameOver)
);
