import { createSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  pitchSelector,
  teamASelector,
  teamBSelector
} from 'selectors/models/game';

const isGameLoadingSelector = createIsLoadingSelector(
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createSelector(
  state => state.gameData,
  isGameLoadingSelector,
  pitchSelector,
  teamASelector,
  teamBSelector,

  (gameData, isGameLoading, pitch, teamA, teamB) => {
    const isGameEditing = gameData.isEditing;
    const game = isGameEditing ? gameData.editedGame : gameData.game;

    return {
      game,
      hasGameLoaded: gameData.hasLoaded,
      isGameEditing,
      isLoading: isGameLoading,
      pitch,
      teamA,
      teamB
    };
  }
);
