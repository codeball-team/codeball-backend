import { createSelector } from 'reselect';

export default createSelector(
  state => state.ajaxRequests.errors,
  errors => ({
    errors: errors.filter(({ isSilent }) => !isSilent)
  })
);
