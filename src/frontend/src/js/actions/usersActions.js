import request from 'superagent';
import { ajax } from 'utils';
import { USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS } from 'constants/actionTypes';
import { usersUrl } from 'constants';

export function usersLoad() {
  return ajax(() => ({
    request: request('GET', usersUrl()),
    json: true,
    startAction: USERS_LOAD,
    successAction: USERS_LOAD_SUCCESS,
    failureAction: USERS_LOAD_FAILURE
  }));
}
