import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { renderConditionally } from 'utils';
import { ROLE_STRING, ROLE_OPTIONS } from 'constants';
import { EditableText, InputWrapper, ValuePicker } from 'components/ui';
import './NewPlayer.scss';

export default class NewPlayer extends Component {
  static propTypes = {
    className: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    role: PropTypes.string,
    onEmailChange: PropTypes.func.isRequired,
    onFirstNameChange: PropTypes.func.isRequired,
    onLastNameChange: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      email,
      firstName,
      lastName,
      role,
      onEmailChange,
      onFirstNameChange,
      onLastNameChange,
      onRoleChange
    } = this.props;

    const isEmailProvided = Boolean(email);
    const isFirstNameProvided = Boolean(firstName);
    const isLastNameProvided = Boolean(lastName);
    const isRoleProvided = Boolean(role);

    return (
      <div
        className={classNames(
          'new-player',
          className
        )}>
        <InputWrapper
          label="First name"
          value={firstName}
          isValid={isFirstNameProvided}>
          <EditableText
            isEditing={true}
            text={firstName}
            onChange={onFirstNameChange} />
        </InputWrapper>

        {renderConditionally({
          when: isFirstNameProvided,
          render: () => (
            <InputWrapper
              label="Last name"
              value={lastName}
              isValid={isLastNameProvided}>
              <EditableText
                isEditing={true}
                text={lastName}
                onChange={onLastNameChange} />
            </InputWrapper>
          )
        })}

        {renderConditionally({
          when: isLastNameProvided,
          render: () => (
            <InputWrapper
              label="Email"
              value={email}
              isValid={isEmailProvided}>
              <EditableText
                isEditing={true}
                text={email}
                onChange={onEmailChange} />
            </InputWrapper>
          )
        })}

        {renderConditionally({
          when: isEmailProvided,
          render: () => (
            <InputWrapper
              label="Role"
              value={ROLE_STRING[role]}
              isValid={isRoleProvided}>
              <ValuePicker
                className="role-picker"
                options={ROLE_OPTIONS}
                value={role}
                onChange={onRoleChange} />
            </InputWrapper>
          )
        })}
      </div>
    );
  }
}
