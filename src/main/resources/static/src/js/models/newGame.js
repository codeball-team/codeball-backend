import _ from 'underscore';
import moment from 'moment';

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
  return _.every([date, duration, hour, minute, pitchId], Number.isInteger);
}

export function newGameToServerFormat(newGame) {
  const {
    date,
    duration,
    hour,
    minute,
    pitchId
  } = newGame;

  return {
    startTimestamp: moment(date).add('hours', hour).add('minutes', minute).valueOf(),
    duration,
    pitchId
  };
}
