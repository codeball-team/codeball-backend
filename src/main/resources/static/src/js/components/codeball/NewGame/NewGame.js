import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  DATE_FORMAT, DURATION_OPTIONS, HOURS_OPTIONS, MINUTES_OPTIONS
} from 'constants/Configuration';
import { InputWrapper } from 'components/ui';
import './NewGame.scss';

export default class NewGame extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.number,
    duration: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    pitches: PropTypes.array.isRequired,
    pitchId: PropTypes.number,
    onDurationChange: PropTypes.func.isRequired,
    onHourChange: PropTypes.func.isRequired,
    onMinuteChange: PropTypes.func.isRequired,
    onPitchIdChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired
  };

  onDurationChange = ({ value }) => {
    const { onDurationChange } = this.props;
    onDurationChange(value);
  };

  onHourChange = ({ value }) => {
    const { onHourChange } = this.props;
    onHourChange(value);
  };

  onMinuteChange = ({ value }) => {
    const { onMinuteChange } = this.props;
    onMinuteChange(value);
  };

  onPitchIdChange = ({ value }) => {
    const { onPitchIdChange } = this.props;
    onPitchIdChange(value);
  };

  onDateChange = (date) => {
    const { onDateChange } = this.props;
    onDateChange(date.valueOf());
  };

  render() {
    const {
      className,
      date,
      duration,
      hour,
      minute,
      pitches,
      pitchId
    } = this.props;

    const pitchesOptions = pitches.map(({ id, name }) => ({
      label: name,
      value: id
    }));

    return (
      <div
        className={classNames(
          'new-game',
          className
        )}>
        <InputWrapper
          label="Start date"
          isValid={Boolean(date)}>
          <DatePicker
            className="editable-text-input"
            dateFormat={DATE_FORMAT}
            locale="en-GB"
            minDate={moment()}
            placeholderText="Select start date..."
            selected={date && moment(date)}
            onChange={this.onDateChange} />
        </InputWrapper>

        <InputWrapper
          label="Start time"
          isValid={Number.isInteger(hour) && Number.isInteger(minute)}>
          <div className="date-input">
            <Select
              className="hour-input"
              placeholder="Select hour..."
              options={HOURS_OPTIONS}
              value={hour}
              searchable={false}
              clearable={false}
              onChange={this.onHourChange} />

            <Select
              className="minute-input"
              placeholder="Select minute..."
              options={MINUTES_OPTIONS}
              value={minute}
              searchable={false}
              clearable={false}
              onChange={this.onMinuteChange} />
          </div>
        </InputWrapper>

        <InputWrapper
          label="Duration"
          isValid={Boolean(duration)}>
          <Select
            placeholder="Select duration..."
            options={DURATION_OPTIONS}
            value={duration}
            searchable={false}
            clearable={false}
            onChange={this.onDurationChange} />
        </InputWrapper>

        <InputWrapper
          label="Pitch"
          isValid={Boolean(pitchId)}>
          <Select
            placeholder="Select pitch..."
            options={pitchesOptions}
            value={pitchId}
            searchable={false}
            clearable={false}
            onChange={this.onPitchIdChange} />
        </InputWrapper>
      </div>
    );
  }
}
