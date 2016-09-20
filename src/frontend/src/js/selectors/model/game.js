import { createSelector } from 'reselect';
import { _, findById } from 'utils';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUSES } from 'constants';

export const currentUserIdSelector = createSelector(
  state => state.currentUserData.currentUser.id,
  currentUserId => currentUserId
);

export const enrollmentsSelector = createSelector(
  state => state.usersData.users,
  state => state.gameData.game.enrolledUsers,
  (users, enrolledUsers) => ENROLLMENT_STATUSES.reduce(
    (enrollments, enrollmentStatus) => ([
      ...enrollments,
      {
        enrollmentStatus,
        enrollmentUsers: enrolledUsers[enrollmentStatus]
          .map(userId => findById(users, userId, null))
          .filter(Boolean)
      }
    ]),
    []
  )
);

export const gameSelector = createSelector(
  state => state.gameData.game,
  game => game
);

export const gameIdSelector = createSelector(
  state => state.gameData.game.id,
  gameId => gameId
);

export const hasGameLoadedSelector = createSelector(
  state => state.gameData.hasLoaded,
  hasLoaded => hasLoaded
);

export const numberOfEnrolledUsersSelector = createSelector(
  state => state.gameData.game.enrolledUsers,
  enrolledUsers => enrolledUsers[ENROLLMENT_STATUS_YES].length
);

export const pitchSelector = createSelector(
  state => state.pitchesData.pitches,
  state => state.gameData.game.pitchId,
  (pitches, pitchId) => findById(pitches, pitchId)
);

export const selectedEnrollmentStatusSelector = createSelector(
  currentUserIdSelector,
  state => state.gameData.game.enrolledUsers,

  (currentUserId, enrolledUsers) => _(enrolledUsers).reduce(
    (enrollmentStatus, userIds, status) => (userIds.includes(currentUserId) ? status : enrollmentStatus),
    undefined
  )
);

export const teamASelector = createSelector(
  state => state.usersData.users,
  state => state.gameData.game.teamA,
  mapUsersIdsToUsers
);

export const teamBSelector = createSelector(
  state => state.usersData.users,
  state => state.gameData.game.teamB,
  mapUsersIdsToUsers
);

export const unenrolledUsersSelector = createSelector(
  state => state.usersData.users,
  state => state.gameData.game.enrolledUsersIds,
  currentUserIdSelector,

  (users, enrolledUsersIds, currentUserId) => users.filter(
    ({ id }) => !enrolledUsersIds.includes(id) && id !== currentUserId
  )
);

function mapUsersIdsToUsers(users, usersIds) {
  return usersIds.map(userId => findById(users, userId, null)).filter(Boolean);
}
