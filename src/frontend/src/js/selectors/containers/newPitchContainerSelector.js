import { createSelector } from 'reselect';

export default createSelector(
  state => state.newPitch,

  newPitch => ({
    newPitch
  })
);
