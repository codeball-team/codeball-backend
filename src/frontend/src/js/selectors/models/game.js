import { createSelector } from 'reselect';
import { findById } from 'utils';
import { ENROLLMENT_STATUSES, ENROLLMENT_STATUS_YES } from 'constants';
import { currentUserIdSelector } from 'selectors/models/currentUser';
import { pitchesSelector } from 'selectors/models/pitches';
import { usersSelector } from 'selectors/models/users';

export const enrolledUsersSelector = createSelector(
  enrollmentsSelector,
  usersSelector,
  (enrollments, users) => enrollments.map(({ userId }) => findById(users, userId))
);

export function enrollmentsSelector(state) {
  return gameSelector(state).enrollments;
}

export const editableGameSelector = createSelector(
  state => state.gameData,
  isGameEditingSelector,
  (gameData, isGameEditing) => (isGameEditing ? gameData.editedGame : gameData.game)
);

export const enrolledUsersPerStatusSelector = createSelector(
  enrolledUsersSelector,
  enrollmentsSelector,
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

export function gameSelector(state) {
  return state.gameData.game;
}

export function gameIdSelector(state) {
  return gameSelector(state).id;
}

export function hasGameLoadedSelector(state) {
  return state.gameData.hasLoaded;
}

export function isGameEditingSelector(state) {
  return state.gameData.isEditing;
}

export const numberOfEnrolledUsersSelector = createSelector(
  enrollmentsSelector,
  enrollments => enrollments.filter(
    ({ enrollmentStatus }) => enrollmentStatus === ENROLLMENT_STATUS_YES
  ).length
);

export const pitchSelector = createSelector(
  state => gameSelector(state).pitchId,
  pitchesSelector,
  (pitchId, pitches) => findById(pitches, pitchId)
);

export const selectedEnrollmentStatusSelector = createSelector(
  currentUserIdSelector,
  enrollmentsSelector,
  (currentUserId, enrollments) => (enrollments.find(
    ({ userId }) => userId === currentUserId
  ) || {}).enrollmentStatus
);

export const teamASelector = createSelector(
  usersSelector,
  state => gameSelector(state).teamA,
  mapUsersIdsToUsers
);

export const teamBSelector = createSelector(
  usersSelector,
  state => gameSelector(state).teamB,
  mapUsersIdsToUsers
);

export const unenrolledUsersSelector = createSelector(
  currentUserIdSelector,
  enrollmentsSelector,
  usersSelector,
  (currentUserId, enrollments, users) => users.filter(
    ({ id }) => id !== currentUserId && enrollments.findIndex(
      ({ userId }) => id === userId
    ) < 0
  )
);

function mapUsersIdsToUsers(users, usersIds) {
  return usersIds.map(userId => findById(users, userId, null)).filter(Boolean);
}
