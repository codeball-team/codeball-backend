import React, { Component, PropTypes } from 'react';
import { _, classNames, findLabelByValue, moment, padLeft } from 'utils';
import { DATE_FORMAT, MONTH_YEAR_FORMAT, DURATION_OPTIONS, HOUR_OPTIONS, MINUTE_OPTIONS } from 'constants';
import { NewGameModel } from 'models';
import { BaseComponent } from 'components/base';
import { Calendar, Form, RangePicker, Select, ValuePicker } from 'components/ui';

const onClickOutside = _.noop;
const valueFormatter = value => padLeft(value, 2);

class NewGame extends Component {
  static propTypes = {
    className: PropTypes.string,
    newGame: PropTypes.object.isRequired,
    pitches: PropTypes.array.isRequired,
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
      newGame,
      newGame: {
        date,
        duration,
        hour,
        minute,
        pitchId
      },
      pitches,
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
              displayValue: findLabelByValue(pitchesOptions, pitchId),
              isValid: NewGameModel.isPitchIdValid(newGame),
              component: (
                <Select
                  noResultsText="There are no pitches"
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
              displayValue: findLabelByValue(DURATION_OPTIONS, duration),
              isValid: NewGameModel.isDurationValid(newGame),
              component: (
                <ValuePicker
                  options={DURATION_OPTIONS}
                  value={duration}
                  onChange={onDurationChange} />
              )
            },
            {
              label: 'Start time',
              displayValue: `${padLeft(hour, 2)}:${padLeft(minute, 2)}`,
              isValid: NewGameModel.isStartTimeValid(newGame),
              component: (
                <RangePicker
                  min={hour}
                  minOptions={HOUR_OPTIONS}
                  max={minute}
                  maxOptions={MINUTE_OPTIONS}
                  orientation="vertical"
                  separator=":"
                  valueFormatter={valueFormatter}
                  onMinChange={onHourChange}
                  onMaxChange={onMinuteChange} />
              )
            },
            {
              label: 'Start date',
              displayValue: selectedStartDate.format(DATE_FORMAT),
              isValid: NewGameModel.isDateValid(newGame),
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
