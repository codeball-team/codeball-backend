import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isCurrentUserLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';
import { newGameSelector } from 'selectors/models/newGame';
import { sortedPitchesSelector } from 'selectors/models/pitches';

const isNewGameLoadingSelector = createIsLoadingSelector(
  isCurrentUserLoadingSelector,
  isPitchesDataLoadingSelector
);

export default createStructuredSelector({
  isLoading: isNewGameLoadingSelector,
  newGame: newGameSelector,
  pitches: sortedPitchesSelector
});
