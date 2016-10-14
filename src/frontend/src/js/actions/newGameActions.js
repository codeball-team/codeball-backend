import request from 'superagent';
import { ajax, safeGet } from 'utils';
import { push } from 'react-router-redux';
import {
  NEW_GAME_CHANGE_DATE,
  NEW_GAME_CHANGE_DURATION,
  NEW_GAME_CHANGE_HOUR,
  NEW_GAME_CHANGE_MINUTE,
  NEW_GAME_CHANGE_PITCH_ID,
  NEW_GAME_RESET,
  NEW_GAME_SUBMIT
} from 'constants/actionTypes';
import { gamesUrl } from 'constants';
import { NewGameModel } from 'models';

export function newGameChangeDate(date) {
  return {
    type: NEW_GAME_CHANGE_DATE,
    date
  };
}

export function newGameChangeDuration(duration) {
  return {
    type: NEW_GAME_CHANGE_DURATION,
    duration
  };
}

export function newGameChangeHour(hour) {
  return {
    type: NEW_GAME_CHANGE_HOUR,
    hour
  };
}

export function newGameChangeMinute(minute) {
  return {
    type: NEW_GAME_CHANGE_MINUTE,
    minute
  };
}

export function newGameChangePitchId(pitchId) {
  return {
    type: NEW_GAME_CHANGE_PITCH_ID,
    pitchId
  };
}

export function newGameReset() {
  return {
    type: NEW_GAME_RESET
  };
}

export function newGameSubmit(newGame) {
  const payload = NewGameModel.toServerFormat(newGame);
  return ajax(dispatch => ({
    actionType: NEW_GAME_SUBMIT,
    request: request('POST', gamesUrl())
      .send(JSON.stringify(payload)),
    json: true,
    debounce: true,
    successCallback: response => {
      const gameId = safeGet(response, ['body', 'id']);
      dispatch(push(`/games/upcoming/${gameId}`));
    }
  }));
}
