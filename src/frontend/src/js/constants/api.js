export function currentUserUrl() {
  return `${usersUrl()}/me`;
}

export function gameCloseEnrollmentUrl(gameId) {
  return `${gameUrl(gameId)}/finishEnrollment`;
}

export function gameDrawTeamsUrl(gameId) {
  return `${gameUrl(gameId)}/team`;
}

export function gameEndUrl(gameId) {
  return `${gameUrl(gameId)}/end`;
}

export function gameEnrollmentUrl(gameId, userId) {
  if(userId) {
    return `${gameUrl(gameId)}/enrollment/${userId}`;
  }
  return `${gameUrl(gameId)}/enrollment`;
}

export function gameSetScoreUrl(gameId) {
  return `${gameUrl(gameId)}/score`;
}

export function gameUrl(gameId) {
  return `${gamesUrl()}/${gameId}`;
}

export function gamesUrl() {
  return `${API_URL}/game`;
}

export function pitchUrl(pitchId) {
  return `${pitchesUrl()}/${pitchId}`;
}

export function pitchesUrl() {
  return `${API_URL}/pitch`;
}

export function userUrl(userId) {
  return `${usersUrl()}/${userId}`;
}

export function usersUrl() {
  return `${API_URL}/user`;
}
