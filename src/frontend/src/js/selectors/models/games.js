import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export const gamesSelector = createSelector(
  state => state.gamesData.games,
  games => games
);

export const sortedGamesSelector = createSelector(
  state => state.gamesData.games,
  games => sortByMany(games, ['date']).reverse()
);
