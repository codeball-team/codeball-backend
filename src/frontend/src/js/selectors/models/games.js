import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export function gamesSelector(state) {
  return state.gamesData.games;
}

export const previousGamesSelector = createSelector(
  gamesSelector,
  games => games.filter(({ isGameOver }) => isGameOver)
);

export const sortedGamesSelector = createSelector(
  gamesSelector,
  games => sortByMany(games, ['date']).reverse()
);

export const upcomingGamesSelector = createSelector(
  gamesSelector,
  games => games.filter(({ isGameOver }) => !isGameOver)
);
