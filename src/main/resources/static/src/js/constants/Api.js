const BASE_API_URL = 'http://localhost:8080/api';

const ADMIN = 'admin';
const CURRENT_USER = 'me';
const GAMES = 'games';
const PITCHES = 'pitches';
const USERS = 'users';

export function currentUserUrl() {
  return `${usersUrl()}/${CURRENT_USER}`;
}

export function gameAdminUrl(gameId) {
  if (gameId) {
    return `${BASE_API_URL}/${ADMIN}/game/${gameId}`;
  }
  return `${BASE_API_URL}/${ADMIN}/game`;
}

export function gameDrawTeamsUrl(gameId) {
  return `${gameUrl(gameId)}/team`;
}

export function gameEnrollmentUrl(gameId) {
  return `${gamesUrl()}/enrollment/${gameId}`;
}

export function gameUrl(gameId) {
  return `${gamesUrl()}/${gameId}`;
}

export function gamesUrl() {
  return `${BASE_API_URL}/${GAMES}`;
}

export function pitchAdminUrl(pitchId) {
  if (pitchId) {
    return `${BASE_API_URL}/${ADMIN}/pitch/${pitchId}`;
  }
  return `${BASE_API_URL}/${ADMIN}/pitch`;
}

export function pitchUrl(pitchId) {
  return `${pitchesUrl()}/${pitchId}`;
}

export function pitchesUrl() {
  return `${BASE_API_URL}/${PITCHES}`;
}

export function usersUrl() {
  return `${BASE_API_URL}/${USERS}`;
}
