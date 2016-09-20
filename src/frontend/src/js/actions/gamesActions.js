import request from 'superagent';
import { ajax } from 'utils';
import { push } from 'react-router-redux';
import {
  GAME_CHANGE_ENROLLMENT_STATUS, GAME_CHANGE_ENROLLMENT_STATUS_FAILURE, GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS,
  GAME_CLOSE_ENROLLMENT, GAME_CLOSE_ENROLLMENT_FAILURE, GAME_CLOSE_ENROLLMENT_SUCCESS,
  GAME_DRAW_TEAMS, GAME_DRAW_TEAMS_FAILURE, GAME_DRAW_TEAMS_SUCCESS,
  GAME_EDIT, GAME_EDIT_CANCEL, GAME_EDIT_SCORE_A, GAME_EDIT_SCORE_B,
  GAME_END, GAME_END_FAILURE, GAME_END_SUCCESS,
  GAME_ENROLL_ANOTHER_USER_CHANGE_USER_ID, GAME_ENROLL_ANOTHER_USER_EDIT, GAME_ENROLL_ANOTHER_USER_EDIT_CANCEL,
  GAME_ENROLL_ANOTHER_USER_RESET, GAME_ENROLL_ANOTHER_USER_SUBMIT,
  GAME_ENROLL_ANOTHER_USER_SUBMIT_FAILURE, GAME_ENROLL_ANOTHER_USER_SUBMIT_SUCCESS,
  GAME_LOAD, GAME_LOAD_FAILURE, GAME_LOAD_SUCCESS,
  GAME_SET_SCORE, GAME_SET_SCORE_SUCCESS, GAME_SET_SCORE_FAILURE,
  GAMES_LOAD, GAMES_LOAD_FAILURE, GAMES_LOAD_SUCCESS
} from 'constants/actionTypes';
import {
  gameCloseEnrollmentUrl,
  gameDrawTeamsUrl,
  gameEndUrl,
  gameEnrollmentUrl,
  gameSetScoreUrl,
  gameUrl,
  gamesUrl
} from 'constants';

export function gameChangeEnrollmentStatus(gameId, userId, enrollmentStatus) {
  return ajax(() => ({
    request: request('PUT', gameEnrollmentUrl(gameId))
      .send(`"${enrollmentStatus}"`),
    json: true,
    debounce: true,
    startAction: GAME_CHANGE_ENROLLMENT_STATUS,
    successAction: GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS,
    failureAction: GAME_CHANGE_ENROLLMENT_STATUS_FAILURE,
    actionsData: {
      gameId,
      userId,
      enrollmentStatus
    }
  }));
}

export function gameCloseEnrollment(gameId) {
  return ajax(() => ({
    request: request('PUT', gameCloseEnrollmentUrl(gameId)),
    json: true,
    throttle: true,
    startAction: GAME_CLOSE_ENROLLMENT,
    successAction: GAME_CLOSE_ENROLLMENT_SUCCESS,
    failureAction: GAME_CLOSE_ENROLLMENT_FAILURE,
    actionsData: {
      gameId
    }
  }));
}

export function gameDrawTeams(gameId) {
  return ajax(() => ({
    request: request('PUT', gameDrawTeamsUrl(gameId)),
    json: true,
    throttle: true,
    startAction: GAME_DRAW_TEAMS,
    successAction: GAME_DRAW_TEAMS_SUCCESS,
    failureAction: GAME_DRAW_TEAMS_FAILURE,
    actionsData: {
      gameId
    }
  }));
}

export function gameEdit() {
  return {
    type: GAME_EDIT
  };
}

export function gameEditCancel() {
  return {
    type: GAME_EDIT_CANCEL
  };
}

export function gameEditScoreA(teamAScore) {
  return {
    type: GAME_EDIT_SCORE_A,
    teamAScore
  };
}

export function gameEditScoreB(teamBScore) {
  return {
    type: GAME_EDIT_SCORE_B,
    teamBScore
  };
}

export function gameEnrollAnotherUserCancel() {
  return {
    type: GAME_ENROLL_ANOTHER_USER_EDIT_CANCEL
  };
}

export function gameEnrollAnotherUserChangeUserId(userId) {
  return {
    type: GAME_ENROLL_ANOTHER_USER_CHANGE_USER_ID,
    userId
  };
}

export function gameEnrollAnotherUserEdit() {
  return {
    type: GAME_ENROLL_ANOTHER_USER_EDIT
  };
}

export function gameEnrollAnotherUserReset() {
  return {
    type: GAME_ENROLL_ANOTHER_USER_RESET
  };
}

export function gameEnrollAnotherUserSubmit(gameId, userId, enrollmentStatus) {
  return ajax(dispatch => ({
    request: request('PUT', gameEnrollmentUrl(gameId, userId))
      .send(`"${enrollmentStatus}"`),
    json: true,
    debounce: true,
    startAction: GAME_ENROLL_ANOTHER_USER_SUBMIT,
    successAction: GAME_ENROLL_ANOTHER_USER_SUBMIT_SUCCESS,
    failureAction: GAME_ENROLL_ANOTHER_USER_SUBMIT_FAILURE,
    successCallback: () => {
      dispatch(gameEnrollAnotherUserReset());
    }
  }));
}

export function gameEnd(gameId) {
  return ajax(dispatch => ({
    request: request('PUT', gameEndUrl(gameId)),
    json: true,
    throttle: true,
    startAction: GAME_END,
    successAction: GAME_END_SUCCESS,
    failureAction: GAME_END_FAILURE,
    actionsData: {
      gameId
    },
    successCallback: () => {
      dispatch(push(`/games/previous/${gameId}`));
    }
  }));
}

export function gameLoad(gameId) {
  return ajax(() => ({
    request: request('GET', gameUrl(gameId)),
    json: true,
    debounce: true,
    startAction: GAME_LOAD,
    successAction: GAME_LOAD_SUCCESS,
    failureAction: GAME_LOAD_FAILURE,
    actionsData: {
      gameId
    }
  }));
}

export function gameSetScore(gameId, teamAScore, teamBScore) {
  return ajax(() => ({
    request: request('PUT', gameSetScoreUrl(gameId))
      .send({ teamAScore, teamBScore }),
    json: true,
    debounce: true,
    startAction: GAME_SET_SCORE,
    successAction: GAME_SET_SCORE_SUCCESS,
    failureAction: GAME_SET_SCORE_FAILURE
  }));
}

export function gamesLoad() {
  return ajax(() => ({
    request: request('GET', gamesUrl()),
    json: true,
    throttle: true,
    startAction: GAMES_LOAD,
    successAction: GAMES_LOAD_SUCCESS,
    failureAction: GAMES_LOAD_FAILURE
  }));
}
