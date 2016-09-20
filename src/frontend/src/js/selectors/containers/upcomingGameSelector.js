import { createStructuredSelector } from 'reselect';
import {
  isLoadingSelector,
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  enrollAnotherUserSelector,
  isEnrollAnotherUserEditingSelector
} from 'selectors/models/enrollAnotherUser';
import {
  currentUserIdSelector,
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

const isUpcomingGameLoadingSelector = isLoadingSelector(
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
