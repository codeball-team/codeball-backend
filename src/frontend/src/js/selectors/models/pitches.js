import { createSelector } from 'reselect';
import { sortByMany } from 'utils';

export function pitchesSelector(state) {
  return state.pitchesData.pitches;
}

export const sortedPitchesSelector = createSelector(
  pitchesSelector,
  pitches => sortByMany(pitches, ['name'])
);
