import request from 'superagent';
import { ajax } from 'utils';
import { PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS } from 'constants/actionTypes';
import { pitchesUrl } from 'constants';

export function pitchesLoad() {
  return ajax(() => ({
    request: request('GET', pitchesUrl()),
    startAction: PITCHES_LOAD,
    successAction: PITCHES_LOAD_SUCCESS,
    failureAction: PITCHES_LOAD_FAILURE
  }));
}
