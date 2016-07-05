import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { MIN_PITCH_CAPACITY, MAX_PITCH_CAPACITY } from 'constants';
import { NewPitchModel } from 'models';
import { EditableText, Form, RangePicker } from 'components/ui';

export default class NewPitch extends Component {
  static propTypes = {
    address: PropTypes.string,
    className: PropTypes.string,
    maxNumberOfPlayers: PropTypes.number,
    minNumberOfPlayers: PropTypes.number,
    name: PropTypes.string,
    onAddressChange: PropTypes.func.isRequired,
    onMaxNumberOfPlayersChange: PropTypes.func.isRequired,
    onMinNumberOfPlayersChange: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired
  };

  render() {
    const {
      address,
      className,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      name,
      onAddressChange,
      onMaxNumberOfPlayersChange,
      onMinNumberOfPlayersChange,
      onNameChange
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
          inputs={[
            {
              label: 'Name',
              value: name,
              isValid: NewPitchModel.isNameValid(name),
              render: () => (
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
              render: () => (
                <EditableText
                  isEditing={true}
                  text={address}
                  onChange={onAddressChange} />
              )
            },
            {
              label: 'Capacity',
              value: capacity,
              isValid: NewPitchModel.isCapacityValid(minNumberOfPlayers, maxNumberOfPlayers),
              render: () => (
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
