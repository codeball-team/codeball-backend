import { createSelector } from 'reselect';
import {
  isLoadingSelector,
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import {
  currentUserIdSelector,
  enrollmentsSelector,
  gameSelector,
  gameIdSelector,
  hasGameLoadedSelector,
  numberOfEnrolledUsersSelector,
  pitchSelector,
  selectedEnrollmentStatusSelector,
  teamASelector,
  teamBSelector,
  unenrolledUsersSelector
} from 'selectors/model/game';

const isUpcomingGameLoadingSelector = isLoadingSelector(
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createSelector(
  isUpcomingGameLoadingSelector,
  currentUserIdSelector,
  state => state.enrollAnotherUser,
  enrollmentsSelector,
  gameSelector,
  gameIdSelector,
  hasGameLoadedSelector,
  numberOfEnrolledUsersSelector,
  pitchSelector,
  selectedEnrollmentStatusSelector,
  teamASelector,
  teamBSelector,
  unenrolledUsersSelector,
  (isLoading, currentUserId, enrollAnotherUser, enrollments, game, gameId, hasGameLoaded, numberOfEnrolledUsers, pitch, selectedEnrollmentStatus, teamA, teamB, unenrolledUsers) => ({
    currentUserId,
    enrollAnotherUser,
    enrollments,
    game,
    gameId,
    hasGameLoaded,
    isEnrollAnotherUserEditing: enrollAnotherUser.isEditing,
    isLoading,
    numberOfEnrolledUsers,
    pitch,
    selectedEnrollmentStatus,
    teamA,
    teamB,
    unenrolledUsers
  })
);
