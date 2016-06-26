const BASE_API_URL = 'http://localhost:8080/api';

const GAMES = 'games';
const PITCHES = 'pitches';
const USERS = 'users';
const CURRENT_USER = 'me';

export function gamesUrl() {
  return `${BASE_API_URL}/${GAMES}`;
}

export function gameUrl(gameId) {
  return `${gamesUrl()}/${gameId}`;
}

export function newGameUrl() {
  return `${gamesUrl()}/new`;
}

export function pitchesUrl() {
  return `${BASE_API_URL}/${PITCHES}`;
}

export function pitchUrl(pitchId) {
  return `${pitchesUrl()}/${pitchId}`;
}

export function usersUrl() {
  return `${BASE_API_URL}/${USERS}`;
}

export function currentUserUrl() {
  return `${usersUrl()}/${CURRENT_USER}`;
}
