import { createSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';

const arePitchesLoadingSelector = createIsLoadingSelector(
  isPitchesDataLoadingSelector
);

export default createSelector(
  arePitchesLoadingSelector,
  state => state.pitchesData.pitches,

  (arePitchesLoading, pitches) => ({
    isLoading: arePitchesLoading,
    pitches
  })
);
