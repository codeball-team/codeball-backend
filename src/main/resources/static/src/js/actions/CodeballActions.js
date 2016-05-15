import request from 'superagent';
import { ajax } from 'utils';
import {
  LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE,
  LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE,
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  CHANGE_ENROLLMENT_STATUS, CHANGE_ENROLLMENT_STATUS_SUCCESS, CHANGE_ENROLLMENT_STATUS_FAILURE,
  LOAD_PITCHES, LOAD_PITCHES_SUCCESS, LOAD_PITCHES_FAILURE
} from 'constants/ActionTypes';
import { usersUrl, currentUserUrl, gameUrl, changeEnrollmentStatusUrl, pitchesUrl } from 'constants/Api';

export function loadUsers() {
  return ajax({
    request: request('GET', usersUrl()),
    startAction: LOAD_USERS,
    successAction: LOAD_USERS_SUCCESS,
    failureAction: LOAD_USERS_FAILURE
  });
}

export function loadCurrentUser() {
  return ajax({
    request: request('GET', currentUserUrl()),
    startAction: LOAD_CURRENT_USER,
    successAction: LOAD_CURRENT_USER_SUCCESS,
    failureAction: LOAD_CURRENT_USER_FAILURE
  });
}

export function loadGame(gameId) {
  return ajax({
    request: request('GET', gameUrl(gameId)),
    startAction: LOAD_GAME,
    successAction: LOAD_GAME_SUCCESS,
    failureAction: LOAD_GAME_FAILURE,
    params: {
      gameId
    }
  });
}

export function changeEnrollmentStatus(gameId, userId, enrollmentStatus) {
  return ajax({
    request: request('GET', changeEnrollmentStatusUrl(gameId, enrollmentStatus)),
    startAction: CHANGE_ENROLLMENT_STATUS,
    successAction: CHANGE_ENROLLMENT_STATUS_SUCCESS,
    failureAction: CHANGE_ENROLLMENT_STATUS_FAILURE,
    params: {
      gameId,
      userId,
      enrollmentStatus
    }
  });
}

export function loadPitches() {
  return ajax({
    request: request('GET', pitchesUrl()),
    startAction: LOAD_PITCHES,
    successAction: LOAD_PITCHES_SUCCESS,
    failureAction: LOAD_PITCHES_FAILURE
  });
}
