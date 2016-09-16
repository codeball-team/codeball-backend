import { createSelector } from 'reselect';

export const isCurrentUserLoadingSelector = state => state.currentUserData.isLoading;
export const isGameDataLoadingSelector = state => state.gameData.isLoading;
export const isGamesDataLoadingSelector = state => state.gamesData.isLoading;
export const isPitchesDataLoadingSelector = state => state.pitchesData.isLoading;
export const isUsersDataLoadingSelector = state => state.usersData.isLoading;

export function isLoadingSelector(...selectors) {
  return createSelector(
    ...selectors,
    (...indicators) => indicators.some(Boolean)
  );
}
