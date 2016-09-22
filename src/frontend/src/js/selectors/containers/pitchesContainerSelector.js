import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';

const arePitchesLoadingSelector = isLoadingSelector(
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
