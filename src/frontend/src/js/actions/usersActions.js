import request from 'superagent';
import { ajax } from 'utils';
import {
  USER_LOAD, USER_LOAD_FAILURE, USER_LOAD_SUCCESS,
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS
} from 'constants/actionTypes';
import { userUrl, usersUrl } from 'constants';

export function userLoad(userId) {
  return ajax(() => ({
    request: request('GET', userUrl(userId)),
    json: true,
    debounce: true,
    startAction: USER_LOAD,
    successAction: USER_LOAD_SUCCESS,
    failureAction: USER_LOAD_FAILURE
  }));
}

export function usersLoad() {
  return ajax(() => ({
    request: request('GET', usersUrl()),
    json: true,
    throttle: true,
    startAction: USERS_LOAD,
    successAction: USERS_LOAD_SUCCESS,
    failureAction: USERS_LOAD_FAILURE
  }));
}
