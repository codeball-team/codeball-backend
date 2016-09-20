import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  sortedUsersSelector
} from 'selectors/models/users';

const areUsersLoadingSelector = isLoadingSelector(
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
