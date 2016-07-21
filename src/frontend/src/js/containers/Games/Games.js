import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import {
  bindActionsAndConnect, refreshDataIfNecessary,
  renderConditionally, sortByMany
} from 'utils';
import { PERMISSION_ADD_GAME } from 'constants';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { GamesListSection } from 'components/sections';

const formatUpcomingGameUrl = id => `/games/upcoming/${id}`;
const formatPreviousGameUrl = id => `/games/previous/${id}`;

class Games extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    gamesData: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions: {
        gamesLoad,
        pitchesLoad,
        usersLoad
      },
      pitchesData,
      usersData
    } = this.props;

    gamesLoad();
    refreshDataIfNecessary(pitchesData, pitchesLoad);
    refreshDataIfNecessary(usersData, usersLoad);
  };

  render() {
    const {
      hasPermission,
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

    const gamesListProps = { pitches, users };
    const sortedGames = sortByMany(_(games).values(), 'date').reverse();
    const upcomingGames = sortedGames.filter(game => !game.isGameOver);
    const previousGames = sortedGames.filter(game => game.isGameOver);

    const isContentLoading = [
      areGamesLoading,
      arePitchesLoading,
      areUsersLoading
    ].some(Boolean);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="games">
            <GamesListSection
              className="upcoming-games"
              title={`Upcoming games (${upcomingGames.length})`}
              formatUrl={formatUpcomingGameUrl}
              games={upcomingGames}
              buttons={[
                renderConditionally({
                  when: hasPermission(PERMISSION_ADD_GAME),
                  render: () => (
                    <Link key="new" to="/games/new">
                      <Button>
                        <IconAdd className="icon" />
                        <span className="label">Add</span>
                      </Button>
                    </Link>
                  )
                })
              ].filter(Boolean)}
              {...gamesListProps} />

            <GamesListSection
              title={`Previous games (${previousGames.length})`}
              formatUrl={formatPreviousGameUrl}
              games={previousGames}
              {...gamesListProps} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(Games, state => ({
  gamesData: state.gamesData,
  pitchesData: state.pitchesData,
  usersData: state.usersData
}));
