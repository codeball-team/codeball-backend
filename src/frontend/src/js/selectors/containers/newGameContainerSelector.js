import { createSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';

const isNewGameLoadingSelector = createIsLoadingSelector(
  isPitchesDataLoadingSelector
);

export default createSelector(
  isNewGameLoadingSelector,
  state => state.newGame,
  state => state.pitchesData.pitches,

  (isNewGameLoading, newGame, pitches) => ({
    isLoading: isNewGameLoading,
    newGame,
    pitches
  })
);
