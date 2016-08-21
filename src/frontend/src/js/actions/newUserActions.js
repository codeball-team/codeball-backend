import request from 'superagent';
import { ajax, safeGet } from 'utils';
import { push } from 'react-router-redux';
import {
  NEW_USER_CHANGE_EMAIL, NEW_USER_CHANGE_FIRST_NAME,
  NEW_USER_CHANGE_LAST_NAME, NEW_USER_CHANGE_ROLE,
  NEW_USER_RESET,
  NEW_USER_SUBMIT, NEW_USER_SUBMIT_FAILURE, NEW_USER_SUBMIT_SUCCESS
} from 'constants/actionTypes';
import { usersUrl } from 'constants';
import { NewUserModel } from 'models';

export function newUserChangeEmail(email) {
  return {
    type: NEW_USER_CHANGE_EMAIL,
    email
  };
}

export function newUserChangeFirstName(firstName) {
  return {
    type: NEW_USER_CHANGE_FIRST_NAME,
    firstName
  };
}

export function newUserChangeLastName(lastName) {
  return {
    type: NEW_USER_CHANGE_LAST_NAME,
    lastName
  };
}

export function newUserChangeRole(role) {
  return {
    type: NEW_USER_CHANGE_ROLE,
    role
  };
}

export function newUserReset() {
  return {
    type: NEW_USER_RESET
  };
}

export function newUserSubmit(newUser) {
  const data = NewUserModel.toServerFormat(newUser);
  return ajax(dispatch => ({
    request: request('POST', usersUrl())
      .send(JSON.stringify(data)),
    json: true,
    startAction: NEW_USER_SUBMIT,
    successAction: NEW_USER_SUBMIT_SUCCESS,
    failureAction: NEW_USER_SUBMIT_FAILURE,
    successCallback: response => {
      const userId = safeGet(response, ['body', 'id']);
      dispatch(push(`/players/${userId}`));
    }
  }));
}
