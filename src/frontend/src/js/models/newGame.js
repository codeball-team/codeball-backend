import { isInRange, model, moment, unixToJavaTimestamp } from 'utils';

const NewGameModel = model({
  defaultAttributes: () => ({
    date: undefined,
    duration: undefined,
    hour: 18,
    minute: 0,
    pitchId: undefined
  }),
  validators: {
    isDateValid({ date }) {
      return Number.isInteger(date);
    },

    isDurationValid({ duration }) {
      return Number.isInteger(duration) && duration > 0;
    },

    isStartTimeValid({ hour, minute }) {
      return this.isHourValid({ hour }) && this.isMinuteValid({ minute });
    },

    isHourValid({ hour }) {
      return Number.isInteger(hour) && isInRange(hour, 0, 23);
    },

    isMinuteValid({ minute }) {
      return Number.isInteger(minute) && isInRange(minute, 0, 59);
    },

    isPitchIdValid({ pitchId }) {
      return Number.isInteger(pitchId);
    }
  },
  toServerFormat(newGameModel) {
    const { date, duration, hour, minute, pitchId } = newGameModel;
    const startTimestamp = moment(date)
      .add(hour, 'hours')
      .add(minute, 'minutes')
      .valueOf();

    return {
      startTimestamp: unixToJavaTimestamp(startTimestamp),
      durationInMinutes: duration,
      pitchId
    };
  }
});

export default NewGameModel;
