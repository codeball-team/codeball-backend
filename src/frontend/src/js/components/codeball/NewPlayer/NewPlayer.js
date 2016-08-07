import React, { Component, PropTypes } from 'react';
import { ROLE_STRING, ROLE_OPTIONS } from 'constants';
import { classNames } from 'utils';
import { NewUserModel } from 'models';
import { BaseComponent } from 'components/base';
import { EditableText, Form, ValuePicker } from 'components/ui';
import './NewPlayer.scss';

class NewPlayer extends Component {
  static propTypes = {
    className: PropTypes.string,
    newUser: PropTypes.object.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onFirstNameChange: PropTypes.func.isRequired,
    onLastNameChange: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      newUser,
      newUser: {
        email,
        firstName,
        lastName,
        role
      },
      onEmailChange,
      onFirstNameChange,
      onLastNameChange,
      onRoleChange,
      onSubmit
    } = this.props;

    return (
      <div
        className={classNames(
          'new-player',
          className
        )}>
        <Form
          onSubmit={onSubmit}
          inputs={[
            {
              label: 'First name',
              value: firstName,
              isValid: NewUserModel.isFirstNameValid(newUser),
              component: (
                <EditableText
                  isEditing={true}
                  text={firstName}
                  onChange={onFirstNameChange} />
              )
            },
            {
              label: 'Last name',
              value: lastName,
              isValid: NewUserModel.isLastNameValid(newUser),
              component: (
                <EditableText
                  isEditing={true}
                  text={lastName}
                  onChange={onLastNameChange} />
              )
            },
            {
              label: 'Email',
              value: email,
              isValid: NewUserModel.isEmailValid(newUser),
              component: (
                <EditableText
                  isEditing={true}
                  text={email}
                  onChange={onEmailChange} />
              )
            },
            {
              label: 'Role',
              value: ROLE_STRING[role],
              isValid: NewUserModel.isRoleValid(newUser),
              component: (
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

export default BaseComponent(NewPlayer);
