import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector
} from 'selectors/isLoading';
import { previousGamesSelector, upcomingGamesSelector } from 'selectors/models/games';
import { pitchesSelector } from 'selectors/models/pitches';

const areGamesLoadingSelector = createIsLoadingSelector(
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector
);

export default createStructuredSelector({
  areGamesLoading: areGamesLoadingSelector,
  pitches: pitchesSelector,
  previousGames: previousGamesSelector,
  upcomingGames: upcomingGamesSelector
});
