import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export const pitchesSelector = createSelector(
  state => state.pitchesData.pitches,
  pitches => pitches
);

export const sortedUsersSelector = createSelector(
  state => state.pitchesData.pitches,
  pitches => sortByMany(pitches, ['name']).reverse()
);
