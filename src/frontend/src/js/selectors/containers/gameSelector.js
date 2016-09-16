import { createSelector } from 'reselect';
import { gamePitchSelector, gameTeamASelector, gameTeamBSelector } from 'selectors';
import {
  isLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';

const isGameLoadingSelector = isLoadingSelector(
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createSelector(
  state => state.gameData,
  isGameLoadingSelector,
  gamePitchSelector,
  state => state.usersData.users,

  (gameData, isGameLoading, pitch, users) => {
    const isGameEditing = gameData.isEditing;
    const game = isGameEditing ? gameData.editedGame : gameData.game;

    return {
      game,
      hasGameLoaded: gameData.hasLoaded,
      isGameEditing,
      isLoading: isGameLoading,
      pitch,
      teamA: gameTeamASelector(users, game.teamA),
      teamB: gameTeamBSelector(users, game.teamB)
    };
  }
);
