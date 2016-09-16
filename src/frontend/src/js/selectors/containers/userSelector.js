import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';

const isUserLoadingSelector = isLoadingSelector(
  isUsersDataLoadingSelector
);

export default createSelector(
  isUserLoadingSelector,
  state => state.usersData,

  (isUserLoading, usersData) => ({
    isLoading: isUserLoading,
    hasUserLoaded: usersData.hasLoaded,
    users: usersData.users
  })
);
