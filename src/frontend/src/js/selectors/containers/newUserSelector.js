import { createSelector } from 'reselect';

export default createSelector(
  state => state.newUser,

  newUser => ({
    newUser
  })
);
