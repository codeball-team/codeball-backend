import React, { Component, PropTypes } from 'react';
import { findById, safeGet } from 'utils';
import { PERMISSION_ADD_USER } from 'constants';
import { ContainerComponent } from 'components/base';
import { LoadableContent } from 'components/ui';
import { PlayerProfileSection } from 'components/sections';
import { PlayerNotLoaded } from 'components/codeball';

class Player extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    params: PropTypes.object,
    refreshDataIfNecessary: PropTypes.func.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    this.updateData();
  };

  componentWillReceiveProps = newProps => {
    const userIdPath = ['params', 'userId'];
    if (safeGet(newProps, userIdPath) !== safeGet(this.props, userIdPath)) {
      this.updateData();
    }
  };

  updateData = () => {
    const {
      refreshDataIfNecessary,
      actions: { usersLoad },
      usersData
    } = this.props;
    refreshDataIfNecessary(usersData, usersLoad);
  };

  render() {
    const {
      hasPermission,
      params: {
        userId
      },
      usersData: {
        users,
        hasLoaded: hasUserLoaded,
        isLoading: areUsersLoading
      }
    } = this.props;

    const user = findById(users, Number(userId));
    const firstName = safeGet(user, ['firstName']);
    const lastName = safeGet(user, ['lastName']);

    return (
      <LoadableContent isLoading={areUsersLoading}>
        <section className="player">
          <PlayerNotLoaded
            renderWhen={!hasUserLoaded}
            canAddNew={hasPermission(PERMISSION_ADD_USER)} />

          <PlayerProfileSection
            renderWhen={hasUserLoaded}
            title={`${lastName} ${firstName}`}
            user={user} />
        </section>
      </LoadableContent>
    );
  }
}

export default ContainerComponent(Player, state => ({
  usersData: state.usersData
}));
