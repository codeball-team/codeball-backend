import { createSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isUserDataLoadingSelector
} from 'selectors/isLoading';

const isUserLoadingSelector = createIsLoadingSelector(
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
