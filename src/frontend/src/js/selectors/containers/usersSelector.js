import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';

const areUsersLoadingSelector = isLoadingSelector(
  isUsersDataLoadingSelector
);

export default createSelector(
  areUsersLoadingSelector,
  state => state.currentUserData.currentUser,
  state => state.usersData.users,

  (areUsersLoading, currentUser, users) => ({
    isLoading: areUsersLoading,
    currentUser,
    users
  })
);
