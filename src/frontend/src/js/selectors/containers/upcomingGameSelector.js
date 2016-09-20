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
  state => state.enrollUser,
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
  (isLoading, currentUserId, enrollUser, enrollments, game, gameId, hasGameLoaded, numberOfEnrolledUsers, pitch, selectedEnrollmentStatus, teamA, teamB, unenrolledUsers) => ({
    currentUserId,
    enrollUser,
    enrollments,
    game,
    gameId,
    hasGameLoaded,
    isEnrollUserEditing: enrollUser.isEditing,
    isLoading,
    numberOfEnrolledUsers,
    pitch,
    selectedEnrollmentStatus,
    teamA,
    teamB,
    unenrolledUsers
  })
);
