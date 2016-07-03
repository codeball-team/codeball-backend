import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { renderConditionally } from 'utils';
import { MIN_PITCH_CAPACITY, MAX_PITCH_CAPACITY } from 'constants';
import { EditableText, InputWrapper, RangePicker } from 'components/ui';

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

    const isAddressProvided = Boolean(address);
    const isMaxNumberOfPlayersProvided = !_.isUndefined(maxNumberOfPlayers);
    const isMinNumberOfPlayersProvided = !_.isUndefined(minNumberOfPlayers);
    const isCapacityProvided = isMinNumberOfPlayersProvided && isMaxNumberOfPlayersProvided;
    const isNameProvided = Boolean(name);
    const capacity = minNumberOfPlayers === maxNumberOfPlayers
      ? `${minNumberOfPlayers}`
      : `${minNumberOfPlayers} - ${maxNumberOfPlayers}`;

    return (
      <div
        className={classNames(
          'new-pitch',
          className
        )}>
        <InputWrapper
          label="Name"
          value={name}
          isValid={isNameProvided}>
          <EditableText
            isEditing={true}
            text={String(name === undefined ? '' : name)}
            onChange={onNameChange} />
        </InputWrapper>

        {renderConditionally({
          when: isNameProvided,
          render: () => (
            <InputWrapper
              label="Address"
              value={address}
              isValid={isAddressProvided}>
              <EditableText
                isEditing={true}
                text={String(address === undefined ? '' : address)}
                onChange={onAddressChange} />
            </InputWrapper>
          )
        })}

        {renderConditionally({
          when: isAddressProvided,
          render: () => (
            <InputWrapper
              label="Capacity"
              value={capacity}
              isValid={isCapacityProvided}>
              <RangePicker
                min={minNumberOfPlayers}
                minOptions={_.range(MIN_PITCH_CAPACITY, maxNumberOfPlayers + 1, 2)}
                max={maxNumberOfPlayers}
                maxOptions={_.range(minNumberOfPlayers, MAX_PITCH_CAPACITY + 1, 2)}
                orientation="vertical"
                separator="-"
                onMinChange={onMinNumberOfPlayersChange}
                onMaxChange={onMaxNumberOfPlayersChange} />
            </InputWrapper>
          )
        })}
      </div>
    );
  }
}
