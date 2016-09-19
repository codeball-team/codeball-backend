import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isPitchDataLoadingSelector
} from 'selectors/isLoading';

const isPitchLoadingSelector = isLoadingSelector(
  isPitchDataLoadingSelector
);

export default createSelector(
  isPitchLoadingSelector,
  state => state.pitchData,

  (isPitchLoading, pitchData) => ({
    isLoading: isPitchLoading,
    hasPitchLoaded: pitchData.hasLoaded,
    pitch: pitchData.pitch
  })
);
