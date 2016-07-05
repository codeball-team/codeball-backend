import _ from 'underscore';
import moment from 'moment';
import { isInRange } from 'utils';
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

  static isDateValid(date) {
    return Number.isInteger(date);
  }

  static isDurationValid(duration) {
    return Number.isInteger(duration) && duration > 0;
  }

  static isStartTimeValid(hour, minute) {
    return NewGameModel.isHourValid(hour) && NewGameModel.isMinuteValid(minute);
  }

  static isHourValid(hour) {
    return Number.isInteger(hour) && isInRange(hour, 0, 23);
  }

  static isMinuteValid(minute) {
    return Number.isInteger(minute) && isInRange(minute, 0, 59);
  }

  static isPitchIdValid(pitchId) {
    return Number.isInteger(pitchId);
  }

  static isValid(newGameModel) {
    const { date, duration, hour, minute, pitchId } = newGameModel;
    return [
      NewGameModel.isDateValid(date),
      NewGameModel.isDurationValid(duration),
      NewGameModel.isStartTimeValid(hour, minute),
      NewGameModel.isPitchIdValid(pitchId)
    ].every(Boolean);
  }

  static toServerFormat(newGameModel) {
    const { date, duration, hour, minute, pitchId } = newGameModel;
    const startTimestamp = moment(date)
      .add('hours', hour)
      .add('minutes', minute)
      .valueOf();

    return {
      startTimestamp: unixToJavaTimestamp(startTimestamp),
      durationInMinutes: duration,
      pitchId
    };
  }
}
