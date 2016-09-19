import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isUserDataLoadingSelector
} from 'selectors/isLoading';

const isUserLoadingSelector = isLoadingSelector(
  isUserDataLoadingSelector
);

export default createSelector(
  isUserLoadingSelector,
  state => state.userData,

  (isUserLoading, userData) => ({
    isLoading: isUserLoading,
    hasUserLoaded: userData.hasLoaded,
    user: userData.user
  })
);
