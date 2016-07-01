import request from 'superagent';
import { ajax } from 'utils';
import {
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS
} from 'constants/ActionTypes';
import { usersUrl } from 'constants/Api';

export function usersLoad() {
  return ajax(() => ({
    request: request('GET', usersUrl()),
    startAction: USERS_LOAD,
    successAction: USERS_LOAD_SUCCESS,
    failureAction: USERS_LOAD_FAILURE
  }));
}
