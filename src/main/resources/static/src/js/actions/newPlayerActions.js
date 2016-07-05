import request from 'superagent';
import { ajax, safeGet } from 'utils';
import { push } from 'react-router-redux';
import {
  NEW_PLAYER_CHANGE_EMAIL, NEW_PLAYER_CHANGE_FIRST_NAME,
  NEW_PLAYER_CHANGE_LAST_NAME, NEW_PLAYER_CHANGE_ROLE,
  NEW_PLAYER_RESET,
  NEW_PLAYER_SUBMIT, NEW_PLAYER_SUBMIT_FAILURE, NEW_PLAYER_SUBMIT_SUCCESS
} from 'constants/actionTypes';
import { userAdminUrl } from 'constants';
import { NewPlayerModel } from 'models';

export function newPlayerChangeEmail(email) {
  return {
    type: NEW_PLAYER_CHANGE_EMAIL,
    email
  };
}

export function newPlayerChangeFirstName(firstName) {
  return {
    type: NEW_PLAYER_CHANGE_FIRST_NAME,
    firstName
  };
}

export function newPlayerChangeLastName(lastName) {
  return {
    type: NEW_PLAYER_CHANGE_LAST_NAME,
    lastName
  };
}

export function newPlayerChangeRole(role) {
  return {
    type: NEW_PLAYER_CHANGE_ROLE,
    role
  };
}

export function newPlayerReset() {
  return {
    type: NEW_PLAYER_RESET
  };
}

export function newPlayerSubmit(newPlayer) {
  const data = NewPlayerModel.toServerFormat(newPlayer);
  return ajax(dispatch => ({
    request: request('POST', userAdminUrl())
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(data)),
    startAction: NEW_PLAYER_SUBMIT,
    successAction: NEW_PLAYER_SUBMIT_SUCCESS,
    failureAction: NEW_PLAYER_SUBMIT_FAILURE,
    successCallback: response => {
      const userId = safeGet(response, ['body', 'id']);
      dispatch(push(`/players/${userId}`));
    }
  }));
}
