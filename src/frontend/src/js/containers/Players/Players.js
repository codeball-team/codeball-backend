import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { bindActionsAndConnect, refreshDataIfNecessary, renderConditionally } from 'utils';
import { PERMISSION_ADD_USER } from 'constants';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { PlayersListSection } from 'components/sections';

class Players extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { usersLoad }, usersData } = this.props;
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

    const numberOfUsers = Object.keys(users).length;

    const isContentLoading = [
      isCurrentUserLoading,
      areUsersLoading
    ].some(Boolean);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="players">
            <PlayersListSection
              title={`Players (${numberOfUsers})`}
              currentUser={currentUser}
              users={_(users).values()}
              buttons={[
                renderConditionally({
                  when: hasPermission(PERMISSION_ADD_USER),
                  render: () => (
                    <Link key="new" to="players/new">
                      <Button>
                        <IconAdd className="icon" />
                        <span className="label">Add</span>
                      </Button>
                    </Link>
                  )
                })
              ]} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(Players, state => ({
  currentUserData: state.currentUserData,
  usersData: state.usersData
}));
