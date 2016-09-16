import { createSelector } from 'reselect';

export default createSelector(
  state => state.usersData.users,
  state => state.gameData.game.enrolledUsersIds,
  state => state.currentUserData.currentUser.id,

  (users, enrolledUsersIds, currentUserId) => users.filter(
    ({ id }) => !enrolledUsersIds.includes(id) && id !== currentUserId
  )
);
