import { createSelector } from 'reselect';

export default createSelector(
  state => state.gamesData.games,

  games => games.filter(({ isGameOver }) => isGameOver)
);
