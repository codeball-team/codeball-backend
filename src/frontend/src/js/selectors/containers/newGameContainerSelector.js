import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';

const isNewGameLoadingSelector = isLoadingSelector(
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
