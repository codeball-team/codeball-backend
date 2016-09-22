import { createSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isPitchDataLoadingSelector
} from 'selectors/isLoading';

const isPitchLoadingSelector = createIsLoadingSelector(
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
