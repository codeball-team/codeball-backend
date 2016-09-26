import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isCurrentUserLoadingSelector
} from 'selectors/isLoading';
import { newPitchSelector } from 'selectors/models/newPitch';

const isNewPitchLoadingSelector = createIsLoadingSelector(
  isCurrentUserLoadingSelector
);

export default createStructuredSelector({
  isLoading: isNewPitchLoadingSelector,
  newPitch: newPitchSelector
});
