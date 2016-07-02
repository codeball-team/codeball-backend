import _ from 'underscore';
import moment from 'moment';
import { unixToJavaTimestamp } from 'constants';

export default function NewGame(newGame) {
  return _({ ...newGame }).defaults({
    date: undefined,
    duration: undefined,
    hour: undefined,
    minute: undefined,
    pitchId: undefined
  });
}

export function isNewGameValid({ date, duration, hour, minute, pitchId }) {
  return [date, duration, hour, minute, pitchId].every(Number.isInteger);
}

export function newGameToServerFormat(newGame) {
  const {
    date,
    duration,
    hour,
    minute,
    pitchId
  } = newGame;

  const startTimestamp = moment(date).add('hours', hour).add('minutes', minute).valueOf();

  return {
    startTimestamp: unixToJavaTimestamp(startTimestamp),
    durationInMinutes: duration,
    pitchId
  };
}
