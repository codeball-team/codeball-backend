import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_USER } from 'constants';
import { Container } from 'components/base';
import { LoadableContent } from 'components/ui';
import { PlayersListSection } from 'components/sections';
import { ButtonAddPlayer } from 'components/codeball';

class Players extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    refreshDataIfNecessary: PropTypes.func.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
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
      currentUserData: {
        currentUser,
        isLoading: isCurrentUserLoading
      },
      usersData: {
        users,
        isLoading: areUsersLoading
      }
    } = this.props;

    return (
      <LoadableContent
        isLoading={[
          areUsersLoading,
          isCurrentUserLoading
        ]}>
        <section className="players">
          <PlayersListSection
            title={`Players (${users.length})`}
            currentUser={currentUser}
            users={users}
            buttons={[
              <ButtonAddPlayer key="add" renderWhen={hasPermission(PERMISSION_ADD_USER)} />
            ]} />
        </section>
      </LoadableContent>
    );
  }
}

export default Container(Players, state => ({
  currentUserData: state.currentUserData,
  usersData: state.usersData
}));
