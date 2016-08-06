import React, { Component, PropTypes } from 'react';
import { _, classNames, findLabelByValue, moment, padLeft } from 'utils';
import { DATE_FORMAT, MONTH_YEAR_FORMAT, DURATION_OPTIONS, HOUR_OPTIONS, MINUTE_OPTIONS } from 'constants';
import { NewGameModel } from 'models';
import Select from 'react-select';
import Calendar from 'react-datepicker/lib/calendar';
import { BaseComponent } from 'components/base';
import { Form, RangePicker, ValuePicker } from 'components/ui';

const onClickOutside = _.noop;
const formatter = value => padLeft(value, 2);

class NewGame extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.number,
    duration: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    pitches: PropTypes.array.isRequired,
    pitchId: PropTypes.number,
    onDateChange: PropTypes.func.isRequired,
    onDurationChange: PropTypes.func.isRequired,
    onHourChange: PropTypes.func.isRequired,
    onMinuteChange: PropTypes.func.isRequired,
    onPitchIdChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
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
      onDurationChange,
      onHourChange,
      onMinuteChange,
      onSubmit
    } = this.props;

    const pitchesOptions = pitches.map(({ id, name }) => ({
      label: name,
      value: id
    }));
    const selectedStartDate = moment(date);

    return (
      <div
        className={classNames(
          'new-game',
          className
        )}>
        <Form
          onSubmit={onSubmit}
          inputs={[
            {
              label: 'Pitch',
              value: findLabelByValue(pitchesOptions, pitchId),
              isValid: NewGameModel.isPitchIdValid(pitchId),
              component: (
                <Select
                  placeholder="Select pitch..."
                  options={pitchesOptions}
                  value={pitchId}
                  searchable={false}
                  clearable={false}
                  onChange={this.onPitchIdChange} />
              )
            },
            {
              label: 'Duration',
              value: findLabelByValue(DURATION_OPTIONS, duration),
              isValid: NewGameModel.isDurationValid(duration),
              component: (
                <ValuePicker
                  options={DURATION_OPTIONS}
                  value={duration}
                  onChange={onDurationChange} />
              )
            },
            {
              label: 'Start time',
              value: `${padLeft(hour, 2)}:${padLeft(minute, 2)}`,
              isValid: NewGameModel.isStartTimeValid(hour, minute),
              component: (
                <RangePicker
                  formatter={formatter}
                  min={hour}
                  minOptions={HOUR_OPTIONS}
                  max={minute}
                  maxOptions={MINUTE_OPTIONS}
                  orientation="vertical"
                  separator=":"
                  onMinChange={onHourChange}
                  onMaxChange={onMinuteChange} />
              )
            },
            {
              label: 'Start date',
              value: selectedStartDate.format(DATE_FORMAT),
              isValid: NewGameModel.isDateValid(date),
              component: (
                <Calendar
                  className="editable-text-input"
                  dateFormat={MONTH_YEAR_FORMAT}
                  locale="en-GB"
                  minDate={moment()}
                  selected={date && selectedStartDate}
                  onClickOutside={onClickOutside}
                  onSelect={this.onDateChange} />
              )
            }
          ]} />
      </div>
    );
  }
}

export default BaseComponent(NewGame);
