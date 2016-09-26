import { createSelector } from 'reselect';

export function enrollAnotherUserSelector(state) {
  return state.enrollAnotherUser;
}

export const isEnrollAnotherUserEditingSelector = createSelector(
  enrollAnotherUserSelector,
  enrollAnotherUser => enrollAnotherUser.isEditing
);
