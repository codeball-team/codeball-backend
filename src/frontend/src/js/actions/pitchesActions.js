import request from 'superagent';
import { ajax } from 'utils';
import {
  PITCH_LOAD, PITCH_LOAD_FAILURE, PITCH_LOAD_SUCCESS,
  PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS
} from 'constants/actionTypes';
import { pitchUrl, pitchesUrl } from 'constants';

export function pitchLoad(pitchId) {
  return ajax(() => ({
    request: request('GET', pitchUrl(pitchId)),
    json: true,
    debounce: true,
    startAction: PITCH_LOAD,
    successAction: PITCH_LOAD_SUCCESS,
    failureAction: PITCH_LOAD_FAILURE
  }));
}

export function pitchesLoad() {
  return ajax(() => ({
    request: request('GET', pitchesUrl()),
    json: true,
    throttle: true,
    startAction: PITCHES_LOAD,
    successAction: PITCHES_LOAD_SUCCESS,
    failureAction: PITCHES_LOAD_FAILURE
  }));
}
