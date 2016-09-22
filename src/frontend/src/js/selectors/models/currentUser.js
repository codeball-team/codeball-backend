import { createSelector } from 'reselect';

export const currentUserIdSelector = createSelector(
  currentUserSelector,
  currentUser => currentUser.id
);

export function currentUserSelector(state) {
  return state.currentUserData.currentUser;
}
