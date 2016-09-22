import { createSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  sortedUsersSelector
} from 'selectors/models/users';

const areUsersLoadingSelector = createIsLoadingSelector(
  isUsersDataLoadingSelector
);

export default createSelector(
  areUsersLoadingSelector,
  state => state.currentUserData.currentUser,
  sortedUsersSelector,

  (areUsersLoading, currentUser, users) => ({
    isLoading: areUsersLoading,
    currentUser,
    users
  })
);
