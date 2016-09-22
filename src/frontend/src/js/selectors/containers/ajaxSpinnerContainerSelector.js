import { createSelector } from 'reselect';

export default createSelector(
  state => state.ajaxRequests.numberOfPendingRequests,
  numberOfPendingRequests => ({
    areTherePendingRequests: numberOfPendingRequests > 0
  })
);
