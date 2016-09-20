import { createSelector } from 'reselect';

export const enrollAnotherUserSelector = createSelector(
  state => state.enrollAnotherUser,
  enrollAnotherUser => enrollAnotherUser
);

export const isEnrollAnotherUserEditingSelector = createSelector(
  state => state.enrollAnotherUser.isEditing,
  isEditing => isEditing
);
