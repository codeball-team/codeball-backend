import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, refreshDataIfNecessary, safeGet } from 'utils';
import { LoadableContent } from 'components/ui';
import { PlayerProfileSection } from 'components/sections';

class Player extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
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
    const { actions: { usersLoad }, usersData } = this.props;
    refreshDataIfNecessary(usersData, usersLoad);
  };

  render() {
    const {
      params: {
        userId
      },
      usersData: {
        users,
        isLoading: areUsersLoading
      }
    } = this.props;

    const { [userId]: user } = users;
    const firstName = safeGet(user, ['firstName']);
    const lastName = safeGet(user, ['lastName']);

    return (
      <LoadableContent
        isLoading={areUsersLoading}
        render={() => (
          <section className="player">
            <PlayerProfileSection
              title={`${firstName} ${lastName}`}
              user={user} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(Player, state => ({
  usersData: state.usersData
}));
