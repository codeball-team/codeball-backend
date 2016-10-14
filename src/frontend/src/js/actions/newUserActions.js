import request from 'superagent';
import { ajax, safeGet } from 'utils';
import { push } from 'react-router-redux';
import {
  NEW_USER_CHANGE_EMAIL,
  NEW_USER_CHANGE_FIRST_NAME,
  NEW_USER_CHANGE_LAST_NAME,
  NEW_USER_CHANGE_ROLE,
  NEW_USER_RESET,
  NEW_USER_SUBMIT
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
  const payload = NewUserModel.toServerFormat(newUser);
  return ajax(dispatch => ({
    actionType: NEW_USER_SUBMIT,
    request: request('POST', usersUrl())
      .send(JSON.stringify(payload)),
    json: true,
    debounce: true,
    successCallback: response => {
      const userId = safeGet(response, ['body', 'id']);
      dispatch(push(`/players/${userId}`));
    }
  }));
}
