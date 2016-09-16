import { defaultMemoize } from 'reselect';
import { findById } from 'utils';

export const gameTeamASelector = defaultMemoize(getTeamUsers);
export const gameTeamBSelector = defaultMemoize(getTeamUsers);

function getTeamUsers(users, team) {
  return team.map(userId => findById(users, userId, null)).filter(Boolean);
}
