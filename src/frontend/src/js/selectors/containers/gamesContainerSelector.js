import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isCurrentUserLoadingSelector,
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import { previousGamesSelector, upcomingGamesSelector } from 'selectors/models/games';
import { pitchesSelector } from 'selectors/models/pitches';

const areGamesLoadingSelector = createIsLoadingSelector(
  isCurrentUserLoadingSelector,
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createStructuredSelector({
  isLoading: areGamesLoadingSelector,
  pitches: pitchesSelector,
  previousGames: previousGamesSelector,
  upcomingGames: upcomingGamesSelector
});
