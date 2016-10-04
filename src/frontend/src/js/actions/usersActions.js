import request from 'superagent';
import { ajax } from 'utils';
import { USERS_LOAD, USER_LOAD } from 'constants/actionTypes';
import { usersUrl, userUrl } from 'constants';

export function usersLoad() {
  return ajax(() => ({
    actionType: USERS_LOAD,
    request: request('GET', usersUrl()),
    json: true,
    throttle: true
  }));
}

export function userLoad(userId) {
  return ajax(() => ({
    actionType: USER_LOAD,
    request: request('GET', userUrl(userId)),
    json: true,
    debounce: true
  }));
}
