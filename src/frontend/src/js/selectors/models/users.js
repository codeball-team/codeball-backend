import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export function usersSelector(state) {
  return state.usersData.users;
}

export const sortedUsersSelector = createSelector(
  usersSelector,
  users => sortByMany(users, ['lastName', 'firstName'])
);
