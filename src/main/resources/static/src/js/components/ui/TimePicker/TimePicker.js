import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NumberPicker from '../NumberPicker/NumberPicker';
import { padLeft } from 'utils';
import './TimePicker.scss';

const formatter = value => padLeft(value, 2);

export default class TimePicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    hour: PropTypes.number,
    hourOptions: PropTypes.array,
    minute: PropTypes.number,
    minuteOptions: PropTypes.array,
    onHourChange: PropTypes.func.isRequired,
    onMinuteChange: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      hour,
      hourOptions,
      minute,
      minuteOptions,
      onHourChange,
      onMinuteChange
    } = this.props;

    return (
      <div
        className={classNames(
          'time-picker',
          className
        )}>
        <NumberPicker
          className="hour-picker"
          orientation="vertical"
          values={hourOptions}
          value={hour}
          formatter={formatter}
          onChange={onHourChange} />

        <span className="separator"> : </span>

        <NumberPicker
          className="minute-picker"
          orientation="vertical"
          values={minuteOptions}
          value={minute}
          formatter={formatter}
          onChange={onMinuteChange} />
      </div>
    );
  }
}
