import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, refreshDataIfNecessary } from 'utils';
import { LoadableContent } from 'components/ui';
// import { NewPlayerSection } from 'components/sections';

class NewPlayer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions: {
        currentUserLoad,
        pitchesLoad,
        usersLoad
      },
      currentUserData,
      pitchesData,
      usersData
    } = this.props;

    refreshDataIfNecessary(currentUserData, currentUserLoad);
    refreshDataIfNecessary(pitchesData, pitchesLoad);
    refreshDataIfNecessary(usersData, usersLoad);
  };

  render() {
    const {
      currentUserData: {
        currentUser,
        isLoading: isCurrentUserLoading
      },
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      },
      usersData: {
        users,
        isLoading: areUsersLoading
      }
    } = this.props;

    const isContentLoading = [
      arePitchesLoading,
      areUsersLoading,
      isCurrentUserLoading
    ].some(Boolean);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="new-player">
            new player
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(NewPlayer, state => ({
  currentUserData: state.currentUserData,
  pitchesData: state.pitchesData,
  usersData: state.usersData
}));
