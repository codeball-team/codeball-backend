import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_GAME } from 'constants';
import { gamesContainerSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { GamesListSection } from 'components/sections';
import { ButtonAddGame } from 'components/codeball';

const formatUpcomingGameUrl = id => `/games/upcoming/${id}`;
const formatPreviousGameUrl = id => `/games/previous/${id}`;

class Games extends Component {
  static propTypes = {
    hasPermission: PropTypes.func.isRequired,
    previousGames: PropTypes.array.isRequired,
    upcomingGames: PropTypes.array.isRequired
  };

  render() {
    const {
      hasPermission,
      previousGames,
      upcomingGames
    } = this.props;

    return (
      <main>
        <GamesListSection
          className="upcoming-games"
          title={`Upcoming games (${upcomingGames.length})`}
          games={upcomingGames}
          urlFormatter={formatUpcomingGameUrl}
          buttons={[
            <ButtonAddGame key="new" renderWhen={hasPermission(PERMISSION_ADD_GAME)} />
          ]} />

        <GamesListSection
          title={`Previous games (${previousGames.length})`}
          games={previousGames}
          urlFormatter={formatPreviousGameUrl} />
      </main>
    );
  }
}

export default ContainerComponent(Games, {
  mapStateToProps: gamesContainerSelector,
  periodicDataUpdates: true,
  updateData: ({ actions }) => {
    actions.currentUserLoad();
    actions.gamesLoad();
    actions.pitchesLoad();
    actions.usersLoad();
  }
});
