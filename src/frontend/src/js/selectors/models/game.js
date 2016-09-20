import { createSelector } from 'reselect';
import { findById } from 'utils';
import { ENROLLMENT_STATUSES, ENROLLMENT_STATUS_YES } from 'constants';

export const currentUserIdSelector = createSelector(
  state => state.currentUserData.currentUser.id,
  currentUserId => currentUserId
);

export const enrolledUsersSelector = createSelector(
  state => state.gameData.game.enrollments,
  state => state.usersData.users,
  (enrollments, users) => enrollments.map(({ userId }) => findById(users, userId))
);

export const enrolledUsersPerStatusSelector = createSelector(
  enrolledUsersSelector,
  state => state.gameData.game.enrollments,
  (enrolledUsers, enrollments) => ENROLLMENT_STATUSES.reduce(
    (enrolledUsersPerStatus, enrollmentStatus) => ([
      ...enrolledUsersPerStatus,
      {
        enrollmentStatus,
        enrolledUsers: enrollments.filter(
          enrollment => enrollment.enrollmentStatus === enrollmentStatus
        ).map(
          ({ userId }) => findById(enrolledUsers, userId)
        )
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
  state => state.gameData.game.enrollments,
  enrollments => enrollments.filter(
    ({ enrollmentStatus }) => enrollmentStatus === ENROLLMENT_STATUS_YES
  ).length
);

export const pitchSelector = createSelector(
  state => state.gameData.game.pitchId,
  state => state.pitchesData.pitches,
  (pitchId, pitches) => findById(pitches, pitchId)
);

export const selectedEnrollmentStatusSelector = createSelector(
  currentUserIdSelector,
  state => state.gameData.game.enrollments,
  (currentUserId, enrollments) => (enrollments.find(
    ({ userId }) => userId === currentUserId
  ) || {}).enrollmentStatus
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
  currentUserIdSelector,
  state => state.gameData.game.enrollments,
  state => state.usersData.users,
  (currentUserId, enrollments, users) => users.filter(
    ({ id }) => id !== currentUserId && enrollments.findIndex(
      ({ userId }) => id === userId
    ) < 0
  )
);

function mapUsersIdsToUsers(users, usersIds) {
  return usersIds.map(userId => findById(users, userId, null)).filter(Boolean);
}
