import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { bindActionsAndConnect, refreshDataIfNecessary, sortByMany } from 'utils';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { GamesListSection } from 'components/sections';

class Games extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    gamesData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions: {
        currentUserLoad,
        gamesLoad,
        pitchesLoad,
        usersLoad
      },
      currentUserData,
      pitchesData,
      usersData
    } = this.props;

    gamesLoad();
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
      gamesData: {
        games,
        isLoading: areGamesLoading
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

    const gamesListProps = { currentUser, pitches, users };
    const sortedGames = sortByMany(_(games).values(), 'date').reverse();
    const upcomingGames = sortedGames.filter(game => !game.isGameOver);
    const previousGames = sortedGames.filter(game => game.isGameOver);

    const isContentLoading = [
      areGamesLoading,
      arePitchesLoading,
      areUsersLoading,
      isCurrentUserLoading
    ].some(Boolean);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="games">
            <GamesListSection
              className="upcoming-games"
              title={`Upcoming games (${upcomingGames.length})`}
              formatUrl={id => `/games/upcoming/${id}`}
              games={upcomingGames}
              buttons={[
                <Link key="new" to="/games/new">
                  <Button>
                    <IconAdd className="icon" />
                    <span className="label">Add</span>
                  </Button>
                </Link>
              ]}
              {...gamesListProps} />

            <GamesListSection
              title={`Previous games (${previousGames.length})`}
              formatUrl={id => `/games/previous/${id}`}
              games={previousGames}
              {...gamesListProps} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(Games, state => ({
  currentUserData: state.currentUserData,
  gamesData: state.gamesData,
  pitchesData: state.pitchesData,
  usersData: state.usersData
}));
