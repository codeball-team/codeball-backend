import React, { Component, PropTypes } from 'react';
import { findById, safeGet } from 'utils';
import { Container } from 'components/base';
import { LoadableContent } from 'components/ui';
import { PlayerProfileSection } from 'components/sections';

class Player extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
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
      params: {
        userId
      },
      usersData: {
        users,
        isLoading: areUsersLoading
      }
    } = this.props;

    const user = findById(users, Number(userId));
    const firstName = safeGet(user, ['firstName']);
    const lastName = safeGet(user, ['lastName']);

    return (
      <LoadableContent
        isLoading={areUsersLoading}
        render={() => (
          <section className="player">
            <PlayerProfileSection
              title={`${lastName} ${firstName}`}
              user={user} />
          </section>
        )} />
    );
  }
}

export default Container(Player, state => ({
  usersData: state.usersData
}));
