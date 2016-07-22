const BASE_API_URL = 'http://localhost:8080/api';

const ADMIN = 'admin';
const CURRENT_USER = 'me';
const GAMES = 'game';
const PITCHES = 'pitch';
const USERS = 'user';

export function currentUserUrl() {
  return `${usersUrl()}/${CURRENT_USER}`;
}

export function gameAdminUrl(gameId) {
  if (gameId) {
    return `${BASE_API_URL}/${ADMIN}/${GAMES}/${gameId}`;
  }
  return `${BASE_API_URL}/${ADMIN}/${GAMES}`;
}

export function gameCloseEnrollmentUrl(gameId) {
  return `${gameUrl(gameId)}/finishEnrollment`;
}

export function gameDrawTeamsUrl(gameId) {
  return `${gameUrl(gameId)}/team`;
}

export function gameEnrollmentUrl(gameId) {
  return `${gameUrl(gameId)}/enrollment`;
}

export function gameUrl(gameId) {
  return `${gamesUrl()}/${gameId}`;
}

export function gamesUrl() {
  return `${BASE_API_URL}/${GAMES}`;
}

export function pitchAdminUrl(pitchId) {
  if (pitchId) {
    return `${BASE_API_URL}/${ADMIN}/${PITCHES}/${pitchId}`;
  }
  return `${BASE_API_URL}/${ADMIN}/${PITCHES}`;
}

export function pitchUrl(pitchId) {
  return `${pitchesUrl()}/${pitchId}`;
}

export function pitchesUrl() {
  return `${BASE_API_URL}/${PITCHES}`;
}

export function userAdminUrl(userId) {
  if (userId) {
    return `${BASE_API_URL}/${ADMIN}/${USERS}/${userId}`;
  }
  return `${BASE_API_URL}/${ADMIN}/${USERS}`;
}

export function usersUrl() {
  return `${BASE_API_URL}/${USERS}`;
}
