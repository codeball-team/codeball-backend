import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import { currentUserIdSelector } from 'selectors/models/currentUser';
import {
  enrollAnotherUserSelector,
  isEnrollAnotherUserEditingSelector
} from 'selectors/models/enrollAnotherUser';
import {
  enrolledUsersPerStatusSelector,
  gameSelector,
  gameIdSelector,
  hasGameLoadedSelector,
  numberOfEnrolledUsersSelector,
  pitchSelector,
  selectedEnrollmentStatusSelector,
  teamASelector,
  teamBSelector,
  unenrolledUsersSelector
} from 'selectors/models/game';

const isUpcomingGameLoadingSelector = createIsLoadingSelector(
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createStructuredSelector({
  currentUserId: currentUserIdSelector,
  enrollAnotherUser: enrollAnotherUserSelector,
  enrolledUsersPerStatus: enrolledUsersPerStatusSelector,
  game: gameSelector,
  gameId: gameIdSelector,
  hasGameLoaded: hasGameLoadedSelector,
  isEnrollAnotherUserEditing: isEnrollAnotherUserEditingSelector,
  isLoading: isUpcomingGameLoadingSelector,
  numberOfEnrolledUsers: numberOfEnrolledUsersSelector,
  pitch: pitchSelector,
  selectedEnrollmentStatus: selectedEnrollmentStatusSelector,
  teamA: teamASelector,
  teamB: teamBSelector,
  unenrolledUsers: unenrolledUsersSelector
});
