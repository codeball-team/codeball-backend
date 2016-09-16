import React, { Component, PropTypes } from 'react';
import { ROLE_STRING } from 'constants';
import { classNames } from 'utils';
import { NewUserModel } from 'models';
import { BaseComponent } from 'components/base';
import { EditableText, Form, ValuePicker } from 'components/ui';
import './NewUser.scss';

class NewUser extends Component {
  static propTypes = {
    className: PropTypes.string,
    newUser: PropTypes.object.isRequired,
    roleOptions: PropTypes.array.isRequired,
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
      roleOptions,
      onEmailChange,
      onFirstNameChange,
      onLastNameChange,
      onRoleChange,
      onSubmit
    } = this.props;

    return (
      <div
        className={classNames(
          'new-user',
          className
        )}>
        <Form
          onSubmit={onSubmit}
          inputs={[
            {
              label: 'First name',
              displayValue: firstName,
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
              displayValue: lastName,
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
              displayValue: email,
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
              displayValue: ROLE_STRING[role],
              isValid: NewUserModel.isRoleValid(newUser),
              component: (
                <ValuePicker
                  className="role-picker"
                  options={roleOptions}
                  value={role}
                  onChange={onRoleChange} />
              )
            }
          ]} />
      </div>
    );
  }
}

export default BaseComponent(NewUser);
