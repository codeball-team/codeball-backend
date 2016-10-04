import request from 'superagent';
import { ajax } from 'utils';
import { CURRENT_USER_LOAD } from 'constants/actionTypes';
import { currentUserUrl } from 'constants';

export function currentUserLoad() {
  return ajax(() => ({
    actionType: CURRENT_USER_LOAD,
    request: request('GET', currentUserUrl()),
    json: true,
    throttle: true
  }));
}
