import request from 'superagent';
import { ajax } from 'utils';
import { CURRENT_USER_LOAD, CURRENT_USER_LOAD_FAILURE, CURRENT_USER_LOAD_SUCCESS } from 'constants/actionTypes';
import { currentUserUrl } from 'constants';

export function currentUserLoad() {
  return ajax(() => ({
    request: request('GET', currentUserUrl()),
    json: true,
    throttle: true,
    startAction: CURRENT_USER_LOAD,
    failureAction: CURRENT_USER_LOAD_FAILURE,
    successAction: CURRENT_USER_LOAD_SUCCESS
  }));
}
