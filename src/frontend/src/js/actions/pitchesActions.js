import request from 'superagent';
import { ajax } from 'utils';
import { PITCHES_LOAD, PITCH_LOAD } from 'constants/actionTypes';
import { pitchesUrl, pitchUrl } from 'constants';

export function pitchesLoad() {
  return ajax(() => ({
    actionType: PITCHES_LOAD,
    request: request('GET', pitchesUrl()),
    json: true,
    throttle: true
  }));
}

export function pitchLoad(pitchId) {
  return ajax(() => ({
    actionType: PITCH_LOAD,
    request: request('GET', pitchUrl(pitchId)),
    json: true,
    debounce: true
  }));
}
