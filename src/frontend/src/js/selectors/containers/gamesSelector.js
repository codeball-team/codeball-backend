import { createSelector } from 'reselect';
import { previousGamesSelector, upcomingGamesSelector } from 'selectors';
import {
  isLoadingSelector,
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';

const areGamesLoadingSelector = isLoadingSelector(
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector
);

export default createSelector(
  areGamesLoadingSelector,
  state => state.pitchesData.pitches,
  state => previousGamesSelector(state),
  state => upcomingGamesSelector(state),

  (areGamesLoading, pitches, previousGames, upcomingGames) => ({
    isLoading: areGamesLoading,
    pitches,
    previousGames,
    upcomingGames
  })
);
