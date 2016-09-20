import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  pitchSelector,
  teamASelector,
  teamBSelector
} from 'selectors/model/game';

const isGameLoadingSelector = isLoadingSelector(
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
  state => state.usersData.users,

  (gameData, isGameLoading, pitch, teamA, teamB, users) => {
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
