import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import moment from 'moment';
import { findLabelByValue, padLeft, renderConditionally } from 'utils';
import { DATE_FORMAT, MONTH_YEAR_FORMAT, DURATION_OPTIONS, HOUR_OPTIONS, MINUTE_OPTIONS } from 'constants';
import Select from 'react-select';
import Calendar from 'react-datepicker/lib/calendar';
import { InputWrapper, TimePicker, ValuePicker } from 'components/ui';
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

  onPitchIdChange = ({ value }) => {
    const { onPitchIdChange } = this.props;
    onPitchIdChange(value);
  };

  onDateChange = date => {
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
      pitchId,
      onMinuteChange,
      onHourChange,
      onDurationChange
    } = this.props;

    const pitchesOptions = pitches.map(({ id, name }) => ({
      label: name,
      value: id
    }));

    const selectedStartDate = moment(date);

    const isPitchSelected = !_.isUndefined(pitchId);
    const isDurationSelected = !_.isUndefined(duration);
    const isStartTimeSelected = !_.isUndefined(hour) && !_.isUndefined(minute);
    const isStartDateSelected = !_.isUndefined(date);

    return (
      <div
        className={classNames(
          'new-game',
          className
        )}>
        <InputWrapper
          label="Pitch"
          value={findLabelByValue(pitchesOptions, pitchId)}
          isValid={isPitchSelected}>
          <Select
            placeholder="Select pitch..."
            options={pitchesOptions}
            value={pitchId}
            searchable={false}
            clearable={false}
            onChange={this.onPitchIdChange} />
        </InputWrapper>

        {renderConditionally({
          when: isPitchSelected,
          render: () => (
            <InputWrapper
              label="Duration"
              value={findLabelByValue(DURATION_OPTIONS, duration)}
              isValid={isDurationSelected}>
              <ValuePicker
                options={DURATION_OPTIONS}
                value={duration}
                onChange={onDurationChange} />
            </InputWrapper>
          )
        })}

        {renderConditionally({
          when: isDurationSelected,
          render: () => [
            <InputWrapper
              key="time"
              label="Start time"
              value={`${padLeft(hour, 2)}:${padLeft(minute, 2)}`}
              isValid={isStartTimeSelected}>
              <div className="date-input">
                <TimePicker
                  hour={hour}
                  hourOptions={HOUR_OPTIONS}
                  minute={minute}
                  minuteOptions={MINUTE_OPTIONS}
                  onHourChange={onHourChange}
                  onMinuteChange={onMinuteChange} />
              </div>
            </InputWrapper>,

            <InputWrapper
              key="date"
              label="Start date"
              value={selectedStartDate.format(DATE_FORMAT)}
              isValid={isStartDateSelected}>
              <Calendar
                className="editable-text-input"
                dateFormat={MONTH_YEAR_FORMAT}
                locale="en-GB"
                minDate={moment()}
                selected={date && selectedStartDate}
                onClickOutside={_.noop}
                onSelect={this.onDateChange} />
            </InputWrapper>
          ]
        })}
      </div>
    );
  }
}
