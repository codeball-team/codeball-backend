import { createSelector } from 'reselect';
import { findById, sortByMany } from 'utils';
import { pitchesSelector } from 'selectors/models/pitches';

export const gamesSelector = createSelector(
  state => state.gamesData.games,
  pitchesSelector,
  (games, pitches) => games.map(game => ({
    ...game,
    pitch: findById(pitches, game.pitchId)
  }))
);

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
