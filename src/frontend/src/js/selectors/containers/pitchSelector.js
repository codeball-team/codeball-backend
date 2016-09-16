import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';

const isPitchLoadingSelector = isLoadingSelector(
  isPitchesDataLoadingSelector
);

export default createSelector(
  isPitchLoadingSelector,
  state => state.pitchesData,

  (isPitchLoading, pitchesData) => ({
    isLoading: isPitchLoading,
    hasPitchLoaded: pitchesData.hasLoaded,
    pitches: pitchesData.pitches
  })
);
