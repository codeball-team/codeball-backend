import request from 'superagent';
import { ajax } from 'utils';
import {
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS,
  USER_LOAD, USER_LOAD_FAILURE, USER_LOAD_SUCCESS
} from 'constants/actionTypes';
import { usersUrl, userUrl } from 'constants';

export function usersLoad() {
  return ajax(() => ({
    request: request('GET', usersUrl()),
    json: true,
    throttle: true,
    startAction: USERS_LOAD,
    failureAction: USERS_LOAD_FAILURE,
    successAction: USERS_LOAD_SUCCESS
  }));
}

export function userLoad(userId) {
  return ajax(() => ({
    request: request('GET', userUrl(userId)),
    json: true,
    debounce: true,
    startAction: USER_LOAD,
    failureAction: USER_LOAD_FAILURE,
    successAction: USER_LOAD_SUCCESS
  }));
}
