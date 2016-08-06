import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { NotLoaded } from 'components/ui';
import { ButtonAddPlayer } from 'components/codeball';

class PlayerNotLoaded extends Component {
  static propTypes = {
    canAddNew: PropTypes.bool
  };

  render() {
    const { canAddNew } = this.props;

    return (
      <NotLoaded message="There is no such player">
        <ButtonAddPlayer renderWhen={canAddNew} label="Add new player" />
      </NotLoaded>
    );
  }
}

export default BaseComponent(PlayerNotLoaded);
