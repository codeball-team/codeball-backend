import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ROLE_STRING, ROLE_OPTIONS } from 'constants';
import { NewUserModel } from 'models';
import { EditableText, Form, ValuePicker } from 'components/ui';
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

    return (
      <div
        className={classNames(
          'new-player',
          className
        )}>
        <Form
          inputs={[
            {
              label: 'First name',
              value: firstName,
              isValid: NewUserModel.isFirstNameValid(firstName),
              render: () => (
                <EditableText
                  isEditing={true}
                  text={firstName}
                  onChange={onFirstNameChange} />
              )
            },
            {
              label: 'Last name',
              value: lastName,
              isValid: NewUserModel.isLastNameValid(lastName),
              render: () => (
                <EditableText
                  isEditing={true}
                  text={lastName}
                  onChange={onLastNameChange} />
              )
            },
            {
              label: 'Email',
              value: email,
              isValid: NewUserModel.isEmailValid(email),
              render: () => (
                <EditableText
                  isEditing={true}
                  text={email}
                  onChange={onEmailChange} />
              )
            },
            {
              label: 'Role',
              value: ROLE_STRING[role],
              isValid: NewUserModel.isRoleValid(role),
              render: () => (
                <ValuePicker
                  className="role-picker"
                  options={ROLE_OPTIONS}
                  value={role}
                  onChange={onRoleChange} />
              )
            }
          ]} />
      </div>
    );
  }
}
