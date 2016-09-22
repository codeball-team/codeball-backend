import React, { Component, PropTypes } from 'react';
import { classNames, findLabelByValue } from 'utils';
import { EnrollAnotherUserModel } from 'models';
import { BaseComponent } from 'components/base';
import { Form, Select } from 'components/ui';

class GameEnrollAnotherUserForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollAnotherUser: PropTypes.object,
    isEditing: PropTypes.bool,
    users: PropTypes.array.isRequired,
    onUserIdChange: PropTypes.func.isRequired
  };

  onUserIdChange = ({ value }) => {
    const { onUserIdChange } = this.props;
    onUserIdChange(value);
  };

  render() {
    const {
      className,
      enrollAnotherUser,
      enrollAnotherUser: {
        userId
      },
      isEditing,
      users
    } = this.props;

    const usersOptions = users.map(({ id, firstName, lastName }) => ({
      label: `${lastName} ${firstName}`,
      value: id
    }));

    return (
      <div
        className={classNames(
          'game-enroll-user-form',
          className
        )}>
        <Form
          renderWhen={isEditing}
          inputs={[
            {
              label: 'Player',
              displayValue: findLabelByValue(usersOptions, userId),
              isValid: EnrollAnotherUserModel.isUserIdValid(enrollAnotherUser),
              component: (
                <Select
                  noResultsText="There are no players"
                  placeholder="Select player..."
                  options={usersOptions}
                  value={userId}
                  searchable={false}
                  clearable={false}
                  onChange={this.onUserIdChange} />
              )
            }
          ]} />
      </div>
    );
  }
}

export default BaseComponent(GameEnrollAnotherUserForm);
