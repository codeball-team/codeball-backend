import _ from 'underscore';
import moment from 'moment';
import { unixToJavaTimestamp } from 'constants';

export default class NewGameModel {
  constructor(attributes) {
    _.extend(this, _({ ...attributes }).defaults({
      date: undefined,
      duration: undefined,
      hour: 18,
      minute: 0,
      pitchId: undefined
    }));
  }

  static isValid(newGameModel) {
    const { date, duration, hour, minute, pitchId } = newGameModel;
    return [date, duration, hour, minute, pitchId].every(Number.isInteger);
  }

  static toServerFormat(newGameModel) {
    const { date, duration, hour, minute, pitchId } = newGameModel;
    const startTimestamp = moment(date).add('hours', hour).add('minutes', minute).valueOf();

    return {
      startTimestamp: unixToJavaTimestamp(startTimestamp),
      durationInMinutes: duration,
      pitchId
    };
  }
}
