import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { NotLoaded } from 'components/ui';
import { ButtonAddUser } from 'components/codeball';

class UserNotLoaded extends Component {
  static propTypes = {
    canAddNew: PropTypes.bool
  };

  render() {
    const { canAddNew } = this.props;

    return (
      <NotLoaded message="There is no such player">
        <ButtonAddUser renderWhen={canAddNew} label="Add new player" />
      </NotLoaded>
    );
  }
}

export default BaseComponent(UserNotLoaded);
