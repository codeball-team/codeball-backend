import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_GAME } from 'constants';
import { ContainerComponent } from 'components/base';
import { LoadableContent } from 'components/ui';
import { GamesListSection } from 'components/sections';
import { ButtonAddGame } from 'components/codeball';

const formatUpcomingGameUrl = id => `/games/upcoming/${id}`;
const formatPreviousGameUrl = id => `/games/previous/${id}`;

class Games extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    gamesData: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    pitchesData: PropTypes.object.isRequired,
    refreshDataIfNecessary: PropTypes.func.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      refreshDataIfNecessary,
      actions: {
        gamesLoad,
        pitchesLoad,
        usersLoad
      },
      gamesData,
      pitchesData,
      usersData
    } = this.props;

    refreshDataIfNecessary(gamesData, gamesLoad);
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
    const upcomingGames = games.filter(game => !game.isGameOver);
    const previousGames = games.filter(game => game.isGameOver);

    return (
      <LoadableContent
        isLoading={[
          areGamesLoading,
          arePitchesLoading,
          areUsersLoading
        ]}>
        <section className="games">
          <GamesListSection
            {...gamesListProps}
            className="upcoming-games"
            title={`Upcoming games (${upcomingGames.length})`}
            formatUrl={formatUpcomingGameUrl}
            games={upcomingGames}
            buttons={[
              <ButtonAddGame key="new" renderWhen={hasPermission(PERMISSION_ADD_GAME)} />
            ]} />

          <GamesListSection
            {...gamesListProps}
            title={`Previous games (${previousGames.length})`}
            formatUrl={formatPreviousGameUrl}
            games={previousGames} />
        </section>
      </LoadableContent>
    );
  }
}

export default ContainerComponent(Games, state => ({
  gamesData: state.gamesData,
  pitchesData: state.pitchesData,
  usersData: state.usersData
}));
