import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isCurrentUserLoadingSelector,
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import { previousGamesSelector, upcomingGamesSelector } from 'selectors/models/games';

const areGamesLoadingSelector = createIsLoadingSelector(
  isCurrentUserLoadingSelector,
  isGamesDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createStructuredSelector({
  isLoading: areGamesLoadingSelector,
  previousGames: previousGamesSelector,
  upcomingGames: upcomingGamesSelector
});
