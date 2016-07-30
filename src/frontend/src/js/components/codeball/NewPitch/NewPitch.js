import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import {
  MIN_PITCH_CAPACITY, MAX_PITCH_CAPACITY,
  PITCH_TYPE_OPTIONS, PITCH_TYPE_STRING
} from 'constants';
import { NewPitchModel } from 'models';
import { EditableText, Form, RangePicker, ValuePicker } from 'components/ui';

export default class NewPitch extends Component {
  static propTypes = {
    address: PropTypes.string,
    className: PropTypes.string,
    maxNumberOfPlayers: PropTypes.number,
    minNumberOfPlayers: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    onAddressChange: PropTypes.func.isRequired,
    onMaxNumberOfPlayersChange: PropTypes.func.isRequired,
    onMinNumberOfPlayersChange: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTypeChange: PropTypes.func.isRequired
  };

  render() {
    const {
      address,
      className,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      name,
      type,
      onAddressChange,
      onMaxNumberOfPlayersChange,
      onMinNumberOfPlayersChange,
      onNameChange,
      onTypeChange,
      onSubmit
    } = this.props;

    const capacity = minNumberOfPlayers === maxNumberOfPlayers
      ? `${minNumberOfPlayers}`
      : `${minNumberOfPlayers} - ${maxNumberOfPlayers}`;

    return (
      <div
        className={classNames(
          'new-pitch',
          className
        )}>
        <Form
          onSubmit={onSubmit}
          inputs={[
            {
              label: 'Name',
              value: name,
              isValid: NewPitchModel.isNameValid(name),
              component: (
                <EditableText
                  isEditing={true}
                  text={name}
                  onChange={onNameChange} />
              )
            },
            {
              label: 'Address',
              value: address,
              isValid: NewPitchModel.isAddressValid(address),
              component: (
                <EditableText
                  isEditing={true}
                  text={address}
                  onChange={onAddressChange} />
              )
            },
            {
              label: 'Pitch type',
              value: PITCH_TYPE_STRING[type],
              isValid: NewPitchModel.isTypeValid(type),
              component: (
                <ValuePicker
                  options={PITCH_TYPE_OPTIONS}
                  value={type}
                  onChange={onTypeChange} />
              )
            },
            {
              label: 'Capacity',
              value: capacity,
              isValid: NewPitchModel.isCapacityValid(minNumberOfPlayers, maxNumberOfPlayers),
              component: (
                <RangePicker
                  min={minNumberOfPlayers}
                  minOptions={_.range(MIN_PITCH_CAPACITY, maxNumberOfPlayers + 1, 2)}
                  max={maxNumberOfPlayers}
                  maxOptions={_.range(minNumberOfPlayers, MAX_PITCH_CAPACITY + 1, 2)}
                  orientation="vertical"
                  separator="-"
                  onMinChange={onMinNumberOfPlayersChange}
                  onMaxChange={onMaxNumberOfPlayersChange} />
              )
            }
          ]} />
      </div>
    );
  }
}
