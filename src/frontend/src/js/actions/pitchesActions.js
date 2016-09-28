import request from 'superagent';
import { ajax } from 'utils';
import {
  PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS,
  PITCH_LOAD, PITCH_LOAD_FAILURE, PITCH_LOAD_SUCCESS
} from 'constants/actionTypes';
import { pitchesUrl, pitchUrl } from 'constants';

export function pitchesLoad() {
  return ajax(() => ({
    request: request('GET', pitchesUrl()),
    json: true,
    throttle: true,
    startAction: PITCHES_LOAD,
    failureAction: PITCHES_LOAD_FAILURE,
    successAction: PITCHES_LOAD_SUCCESS
  }));
}

export function pitchLoad(pitchId) {
  return ajax(() => ({
    request: request('GET', pitchUrl(pitchId)),
    json: true,
    debounce: true,
    startAction: PITCH_LOAD,
    failureAction: PITCH_LOAD_FAILURE,
    successAction: PITCH_LOAD_SUCCESS
  }));
}
