import { createSelector } from 'reselect';
import { _ } from 'utils';
import { ENROLLMENT_STATUS_YES } from 'constants';
import {
  gamePitchSelector,
  gameTeamASelector,
  gameTeamBSelector,
  gameUnenrolledUsersSelector
} from 'selectors';
import {
  isLoadingSelector,
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';

const isUpcomingGameLoadingSelector = isLoadingSelector(
  isCurrentUserLoadingSelector,
  isGameDataLoadingSelector,
  isPitchesDataLoadingSelector,
  isUsersDataLoadingSelector
);

export default createSelector(
  isUpcomingGameLoadingSelector,
  state => state.currentUserData.currentUser.id,
  state => state.enrollUser,
  state => state.gameData,
  gamePitchSelector,
  gameUnenrolledUsersSelector,
  state => state.usersData.users,

  (isUpcomingGameLoading, currentUserId, enrollUser, gameData, pitch, unenrolledUsers, users) => {
    const { game, game: { enrolledUsers } } = gameData;

    return {
      currentUserId,
      enrollUser,
      game,
      gameId: game.id,
      hasGameLoaded: gameData.hasLoaded,
      isEnrollUserEditing: enrollUser.isEditing,
      isLoading: isUpcomingGameLoading,
      numberOfEnrolledUsers: enrolledUsers[ENROLLMENT_STATUS_YES].length,
      pitch,
      selectedEnrollmentStatus: _(enrolledUsers).reduce(
        (enrollmentStatus, userIds, status) => (userIds.includes(currentUserId) ? status : enrollmentStatus),
        undefined
      ),
      teamA: gameTeamASelector(users, game.teamA),
      teamB: gameTeamBSelector(users, game.teamB),
      unenrolledUsers,
      users
    };
  }
);
