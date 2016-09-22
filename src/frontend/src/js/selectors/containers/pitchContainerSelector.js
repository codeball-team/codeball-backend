import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isPitchDataLoadingSelector
} from 'selectors/isLoading';
import {
  hasPitchLoadedSelector,
  pitchSelector
} from 'selectors/models/pitch';

const isPitchLoadingSelector = createIsLoadingSelector(
  isPitchDataLoadingSelector
);

export default createStructuredSelector({
  hasPitchLoaded: hasPitchLoadedSelector,
  isLoading: isPitchLoadingSelector,
  pitch: pitchSelector
});
