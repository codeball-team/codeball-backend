import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';
import { sortedPitchesSelector } from 'selectors/models/pitches';

const arePitchesLoadingSelector = createIsLoadingSelector(
  isPitchesDataLoadingSelector
);

export default createStructuredSelector({
  isLoading: arePitchesLoadingSelector,
  pitches: sortedPitchesSelector
});
