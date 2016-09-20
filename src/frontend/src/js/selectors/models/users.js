import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export const usersSelector = createSelector(
  state => state.usersData.users,
  users => users
);

export const sortedUsersSelector = createSelector(
  state => state.usersData.users,
  users => sortByMany(users, ['lastName', 'firstName']).reverse()
);
