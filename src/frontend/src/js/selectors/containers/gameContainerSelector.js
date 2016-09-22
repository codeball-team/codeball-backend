import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  editableGameSelector,
  hasGameLoadedSelector,
  isGameEditingSelector,
  pitchSelector,
  teamASelector,
  teamBSelector
} from 'selectors/models/game';

const isGameLoadingSelector = createIsLoadingSelector(
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createStructuredSelector({
  game: editableGameSelector,
  hasGameLoaded: hasGameLoadedSelector,
  isGameEditing: isGameEditingSelector,
  isGameLoading: isGameLoadingSelector,
  pitch: pitchSelector,
  teamA: teamASelector,
  teamB: teamBSelector
});
