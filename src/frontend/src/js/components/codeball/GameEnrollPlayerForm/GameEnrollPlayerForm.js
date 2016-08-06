import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { findLabelByValue } from 'utils';
import { EnrollUserModel } from 'models';
import Select from 'react-select';
import { ConditionalRender } from 'components/base';
import { Form } from 'components/ui';

class GameEnrollPlayerForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollUser: PropTypes.object,
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
      enrollUser: {
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
          'game-enroll-player-form',
          className
        )}>
        <Form
          renderWhen={isEditing}
          inputs={[
            {
              label: 'Player',
              value: findLabelByValue(usersOptions, userId),
              isValid: EnrollUserModel.isUserIdValid(userId),
              component: (
                <Select
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

export default ConditionalRender(GameEnrollPlayerForm);
