import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';
import { newGameSelector } from 'selectors/models/newGame';
import { sortedPitchesSelector } from 'selectors/models/pitches';

const isNewGameLoadingSelector = createIsLoadingSelector(
  isPitchesDataLoadingSelector
);

export default createStructuredSelector({
  isNewGameLoading: isNewGameLoadingSelector,
  newGame: newGameSelector,
  pitches: sortedPitchesSelector
});
