import request from 'superagent';
import { ajax } from 'utils';
import {
  LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE,
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  LOAD_PITCHES, LOAD_PITCHES_SUCCESS, LOAD_PITCHES_FAILURE
} from 'constants/ActionTypes';

export function loadUsers() {
  return ajax({
    request: request('GET', 'http://localhost:8080/api/users'),
    startAction: LOAD_USERS,
    successAction: LOAD_USERS_SUCCESS,
    failureAction: LOAD_USERS_FAILURE
  });
}

export function loadGame(gameUrl) {
  return ajax({
    request: request('GET', gameUrl),
    startAction: LOAD_GAME,
    successAction: LOAD_GAME_SUCCESS,
    failureAction: LOAD_GAME_FAILURE
  });
}

export function loadPitches() {
  return ajax({
    request: request('GET', 'http://localhost:8080/api/pitches'),
    startAction: LOAD_PITCHES,
    successAction: LOAD_PITCHES_SUCCESS,
    failureAction: LOAD_PITCHES_FAILURE
  });
}
